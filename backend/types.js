const zod = require('zod');
 

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
  
});

const updatetodo = zod.object({
id : zod.string(),
});

module.exports = { 
todoSchema : todoSchema,
updatetodo : updatetodo
};  
