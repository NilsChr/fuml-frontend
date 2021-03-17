const entityUtil = {
  hashCode: function(str) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  },
  mirrorRel: function(r) {
    switch (r) {
      case "|o":
        return "o|";
      case "||":
        return "||";
      case "}o":
        return "o{";
      case "}|":
        return "|{";
    }
  },
  createEntityPairs(project) {
    let pairs = [];
    for (let i = 0; i < project.entities.length; i++) {
      let entity = project.entities[i];

      entity.relations.forEach((r) => {
        let pair = entityUtil.findRelationPair(entity, r, project);
        if (pair) {
          pairs.push(pair);
        }
      });
    }

    const uniquePairs = Array.from(new Set(pairs.map((a) => a.hash))).map(
      (hash) => {
        return pairs.find((a) => a.hash === hash);
      }
    );
    return uniquePairs;
  },
  findRelationPair(lookingEntity, relation, project) {
    for (let i = 0; i < project.entities.length; i++) {
      let entity = project.entities[i];

      if (entity.name == lookingEntity.name) continue;

      let match = entity.relations.filter(
        (r) => r.entity == lookingEntity.name
      )[0];
      if (match) {
        return {
          ent1: relation.entity,
          type1: relation.type,
          ent2: match.entity,
          type2: match.type,
          // This hash will be unique for each entity combination, working as a fingerprint
          hash: this.hashCode(relation.entity) + this.hashCode(match.entity),
        };
      }
    }
    return {
      ent1: lookingEntity.name,
      type1: relation.type,
      ent2: relation.entity,
      type2: null,
      hash: this.hashCode(lookingEntity.name),
    };
  },
  createRelationString(relationPair) {
    let out = "";

    //{ ent1: 'e2', type1: '|o', ent2: 'e1', type2: '|o', hash: 6361 }
    out += '\"' + relationPair.ent1 + "\" ";
    out += relationPair.type1 + "--";
    if (relationPair.type2 != null) {
      out += this.mirrorRel(relationPair.type2);
    }
    out += " \"" + relationPair.ent2 + "\"\n";
    return out;
  },
};

export default entityUtil;
