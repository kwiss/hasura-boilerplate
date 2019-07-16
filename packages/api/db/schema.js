import Knex from "knex";
import Objection from "objection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createRequire } from "module";

import * as jwtConfig from "../config/jwt";

const require = createRequire(import.meta.url);
const connection = require("../knexfile");

const knexConnection = Knex(connection);
const { Model } = Objection;
Model.knex(knexConnection);

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static get idColumn() {
    return "id";
  }
}

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "user.id",
          through: {
            from: "user_role.user_id",
            to: "user_role.role_id"
          },
          to: "role.id"
        }
      }
    };
  }

  getRoles() {
    return this.roles.map(el => el.name).concat("user");
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
      roles: this.getRoles(),
      token: this.getJwt()
    };
  }

  getHasuraClaims() {
    return {
      "x-hasura-allowed-roles": this.getRoles(),
      "x-hasura-default-role": "user",
      "x-hasura-user-id": `${this.id}`
    };
  }

  getJwt() {
    const signOptions = {
      subject: this.id,
      expiresIn: "30d", // 30 days validity
      algorithm: "RS256"
    };
    const claim = {
      name: this.username,
      "https://hasura.io/jwt/claims": this.getHasuraClaims()
    };
    return jwt.sign(claim, jwtConfig.key, signOptions);
  }

  async $beforeInsert() {
    const salt = bcrypt.genSaltSync();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async $beforeUpdate() {
    await this.$beforeInsert();
  }

  verifyPassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}
export { User, Role };
