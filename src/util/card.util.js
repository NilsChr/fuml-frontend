const cardUtil = {
  removeLabelFromCard(card, labelId) {
    const index = card.labels.indexOf(labelId);
    card.labels.splice(index,1);
  },
};

export default cardUtil;
