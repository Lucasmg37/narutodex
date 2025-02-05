const { getFandomJutsus } = require('../fandom/character')
const { getJutsusByCharacter } = require('../fandom/jutsuData')
const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: 'XXX', secretAccessKey: 'XXX', region: 'us-east-1' })
const { default: fetch } = require('node-fetch')

module.exports = {
  initAllDataBase: async () => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })
    const s3Client = new AWS.S3({ region: 'us-east-1' })

    const characters = await getFandomJutsus()

    for await (const character of characters) {
      try {
        let imageUrl = ''

        // if (character.image_fandom) {
        //   const response = await fetch(character.image_fandom)
        //   const buffer = await response.buffer()

        //   const data = await s3Client.upload({
        //     Bucket: 'pokedex-characters',
        //     Body: buffer,
        //     Key: 'characters/' + character.about_url.replace('/pt-br/wiki/', '') + '.jpg',
        //     ACL: 'public-read'
        //   }).promise()

        //   imageUrl = data.Location
        // }

        // const uuid = uuidv4()

        // const params = {
        //   TableName: 'characters',
        //   Item: {
        //     id: character.about_url,
        //     uuid,
        //     name: character.name,
        //     about_url: character.about_url,
        //     jutsus_url: character.jutsus_url,
        //     description: character.description,
        //     image_url: imageUrl,
        //     updatedAt: new Date().toISOString(),
        //     jutsus: character.jutsus || []
        //   }
        // }

        // if (!character.about_url) {
        //   throw new Error('Sem URL de dados')
        // }

        // await documentClient.put(params).promise()

        console.log('Success - item added or updated', character.about_url)
      } catch (err) {
        console.log('Error', err.stack)
      }
    }

    const jutsus = await getJutsusByCharacter(characters)

    for await (const jutsu of jutsus) {
      try {
        let imageUrl = ''

        if (jutsu.image) {
          console.log(jutsu.image)
          const response = await fetch(jutsu.image)
          const buffer = await response.buffer()

          if (buffer.byteLength !== 1336) {
            let extension = '.png'

            if (jutsu.image.indexOf('.jpg') > 0) {
              extension = '.jpg'
            }

            if (jutsu.image.indexOf('.PNG') > 0) {
              extension = '.PNG'
            }

            const data = await s3Client.upload({
              Bucket: 'pokedex-characters',
              Body: buffer,
              Key: 'jutsus/' + jutsu.url.replace('/pt-br/wiki/', '') + extension,
              ACL: 'public-read'
            }).promise()

            imageUrl = data.Location
          }
        }

        const uuid = uuidv4()

        const params = {
          TableName: 'jutsus',
          Item: {
            id: jutsu.url,
            uuid,
            name: jutsu.title,
            jutsu_url: jutsu.url,
            description: jutsu.description,
            image_url: imageUrl,
            updatedAt: new Date().toISOString(),
            classifications: jutsu.classifications || [],
            rank: jutsu.rank,
            elements: jutsu.elements || [],
            handstamps: jutsu.handstamps || [],
            classes: jutsu.classes || [],
            reachs: jutsu.reachs,
            parents: jutsu.parents
          }
        }

        if (!jutsu.url) {
          throw new Error('Sem URL de dados')
        }

        await documentClient.put(params).promise()

        console.log('Success - item added or updated', jutsu.url)
      } catch (err) {
        console.log('Error', err.stack)
      }
    }
  }
}
