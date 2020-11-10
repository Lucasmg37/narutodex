module.exports = {
  getTextInsideTag: (tag = String, string = String) => {
    try {
      let newString = string

      if (!newString) {
        return newString
      }

      newString = newString.split('</' + tag + '>')[0]
      newString = newString.split('<' + tag)[1]
      newString = newString.split('>')
      delete (newString[0])
      newString = newString.join('')

      return newString
    } catch (err) {
      // console.log(string)
      return false
    }
  },

  getAttributeTag: (tag = String, attribute = String, string = String) => {
    if (!string) {
      return false
    }

    if (string.indexOf(tag) === -1 || string.indexOf(attribute) === -1) {
      return false
    }

    string = string.split(attribute + '="')[1]
    string = string.split('"')[0]

    return string
  }
}
