import entityUtil from "./entity.util";

function createMockProject() {
  const mock = {
    id: "aaa",
    name: "mockproject",
    entities: [
      {
        id: "123",
        name: "e1",
        properties: [{ title: "title1", type: "type1" }],
        relations: [{ entity: "e2", type: "|o" }],
      },
      {
        id: "123",
        name: "e2",
        properties: [{ title: "title2", type: "type2" }],
        relations: [{ entity: "e1", type: "|o" }],
      },
      {
        id: "123",
        name: "e3",
        properties: [{ title: "title3", type: "type3" }],
        relations: [{ entity: "e1", type: "||" }],
      },
    ],
  };

  return mock;
}

test("first test", () => {
  const a = 2 + 3;
  expect(a).toBe(5);
});

test("should flip relation type", () => {
  const mock = createMockProject();
  const rel = mock.entities[0].relations[0];
  let result = entityUtil.mirrorRel(rel.type);

  expect(result).toBe("o|");
});

test("should find find an entity pair", () => {
  const mock = createMockProject();
  const entity = mock.entities[0];
  const rel = mock.entities[0].relations[0];
  let result = entityUtil.findRelationPair(entity, rel, mock);

  expect(result).not.toBeNull();
});

test("should create entity pairs", () => {
  const mock = createMockProject();
  let result = entityUtil.createEntityPairs(mock);
  expect(result.length).toBe(2);
});

test("it should create propper plantuml relation text", () => {
  let input = { ent1: "e2", type1: "|o", ent2: "e1", type2: "|o", hash: 6361 };
  let result = entityUtil.createRelationString(input);
  let expected = "e2 |o--o| e1\n";
  expect(result).toBe(expected);
});

test("it should create propper plantuml relation text with one side relation", () => {
  let input = { ent1: "e2", type1: "|o", ent2: "e1", type2: null, hash: 6361 };
  let result = entityUtil.createRelationString(input);
  let expected = "e2 |o-- e1\n";
  expect(result).toBe(expected);
});
