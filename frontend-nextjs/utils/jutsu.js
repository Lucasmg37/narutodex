/**
 * @var classes array
 * */
export const classesToString = classes => {
  let classString = '';

  if (classes && classes.length) {
    classes.forEach((element, index) => {
      if (index === 0) {
        classString = `${element.class}`;
      } else {
        classString = `${classString}, ${element.class}`;
      }
    });
  }
  return classString;
};

/**
 * @var classes array
 * */
export const classificationsToString = classifications => {
  let classification = '';

  if (classifications && classifications.length) {
    classifications.forEach((element, index) => {
      if (index === 0) {
        classification = `${element.classification}`;
      } else {
        classification = `${classification}, ${element.classification}`;
      }
    });
  }
  return classification;
};

const jutsu = {
  classesToString,
};

export default jutsu;
