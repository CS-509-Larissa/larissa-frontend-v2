const flattenClassifications = (classificationTree) => {
  //
  return _flattenClassifications([], classificationTree);
};

const _flattenClassifications = (classifications, classificationTree) => {
  classificationTree.forEach((classification) => {
    console.log(`Adding ${classification.name} to list`);
    classifications.push(classification);
    if (classification.subClassifications) {
      console.log(`Found subClassifications for ${classification.name}`);
      console.log(classification.subClassifications);
      _flattenClassifications(
        classifications,
        classification.subClassifications
      );
    }
    /*
    if (classification.subClassifications !== null) {
      classifications.subClassifications.forEach((c) => {
        _flattenClassifications(classifications, c);
      });
    }
    */
  });
  return classifications;
};

export default flattenClassifications;
