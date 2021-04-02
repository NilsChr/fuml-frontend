import cardUtil from "./card.util";

test("first test", () => {
    const card = {
        labels: [
            '1234','2345', '3456'
        ]
    }
    cardUtil.removeLabelFromCard(card, '1234');

    expect(card.labels.length).toBe(2);
  });
  