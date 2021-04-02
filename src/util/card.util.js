const cardUtil = {
  removeLabelFromCard(card, labelId) {
    /*const el = card.labels.find((l) => l == labelId);
    if (el) {
      const index = card.labels.indexOf(el);
      card.labels.splice(index, 1);
    }*/
    const index = card.labels.indexOf(labelId);
    card.labels.splice(index,1);
  },
};

export default cardUtil;
