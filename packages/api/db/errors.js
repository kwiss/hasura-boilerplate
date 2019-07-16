import objectionDbErrors from "objection-db-errors";
import objection from "objection";

const {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = objectionDbErrors;
const { ValidationError, NotFoundError } = objection;

// In this example `ctx` is an express response object.
function errorHandler(err, ctx) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        ctx.status = 400;
        ctx.body = {
          message: err.message,
          type: "ModelValidation",
          data: err.data
        };
        break;
      case "RelationExpression":
        ctx.status = 400;
        ctx.body = {
          message: err.message,
          type: "InvalidRelationExpression",
          data: {}
        };
        break;
      case "UnallowedRelation":
        ctx.status = 400;
        ctx.body = {
          message: err.message,
          type: "UnallowedRelation",
          data: {}
        };
        break;
      case "InvalidGraph":
        ctx.status = 400;
        ctx.body = {
          message: err.message,
          type: "InvalidGraph",
          data: {}
        };
        break;
      default:
        ctx.status = 400;
        ctx.body = {
          message: err.message,
          type: "UnknownValidationError",
          data: {}
        };
        break;
    }
  } else if (err instanceof NotFoundError) {
    ctx.status = 404;
    ctx.body = {
      message: err.message,
      type: "NotFound",
      data: {}
    };
  } else if (err instanceof UniqueViolationError) {
    ctx.status = 409;
    ctx.body = {
      message: err.message,
      type: "UniqueViolation",
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof NotNullViolationError) {
    ctx.status = 400;
    ctx.body = {
      message: err.message,
      type: "NotNullViolation",
      data: {
        column: err.column,
        table: err.table
      }
    };
  } else if (err instanceof ForeignKeyViolationError) {
    ctx.status = 409;
    ctx.body = {
      message: err.message,
      type: "ForeignKeyViolation",
      data: {
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof CheckViolationError) {
    ctx.status = 400;
    ctx.body = {
      message: err.message,
      type: "CheckViolation",
      data: {
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof DataError) {
    ctx.status = 400;
    ctx.body = {
      message: err.message,
      type: "InvalidData",
      data: {}
    };
  } else if (err instanceof DBError) {
    ctx.status = 500;
    ctx.body = {
      message: err.message,
      type: "UnknownDatabaseError",
      data: {}
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      message: err.message,
      type: "UnknownError",
      data: {}
    };
  }
}

export default errorHandler;
