const request = require('supertest');
const expect = require('expect');
const {app} = require ('../server');
const {ObjectID} = require('mongodb');

const {Todo} = require('../models/todo');
const {User} = require('../models/user');

const todos = [
  { _id : new ObjectID(),
    text : 'first text for todos'},
  { _id : new ObjectID(),
    text : 'second text for todos'}
]


//******************************************************************************/
/**                 Test POST /todos                                        ****/
/*******************************************************************************/

beforeEach((done) => {
 
  Todo.remove({}).then(() =>{
    return Todo.insertMany(todos);
}).then(() => done());
});




describe('POST /todos',() => {

  it('should create a new Todo',(done) => {
   
    var text = 'Test Todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {

        expect(res.body.text).toBe(text);
        
    })
    .end((err,res) => {
       if(err){
           return done(err);
       }
       Todo.find({text}).then((todos) => {
        
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
           done();

       }).catch( (e) => done(e));
    });


  });


  it('Should not create todo with invalid body data',(done) => {

  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err,res) => {
 
    if(err){
      return done(err);
    }
    console.log('je suis la');
    Todo.find().then((todos) => {
      expect(todos.length).toBe(2);
      done();
    }).catch((e) => done(e));
  });


  });



});

//******************************************************************************/
/**                 Test GET /todos                                         ****/
/*******************************************************************************/

describe('GET /todos',() => {
  
    it('should List All Todos',(done) => {
   
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
          expect(res.body.todos.length).toBe(2);
      })
      .end(done);
      
    });

  });



  
//******************************************************************************/
/**                 Test GET /todos/:id                                         ****/
/*******************************************************************************/

describe('GET /todos/:id',() => {
  
    it('should fetch todo by ID',(done) => {

      
      request(app)
      .get( `/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
      
    });

    it('should return 404 if todo not found',(done) => {

       var idHex = new ObjectID().toHexString();

      request(app)
      .get( `/todos/${idHex}`)
      .expect(404)
      .end(done);

    });

    it('should return 404 if not-Object ID',(done) => {
      
                  
            request(app)
            .get( `/todos/12457`)
            .expect(404)
            .end(done);
      
          });

  });

//******************************************************************************/
/**                 Test DELETE /todos/:id                                  ****/
/*******************************************************************************/

describe('DELETE /todos/:id',() => {
  
    it('should DELETE todo by ID',(done) => {

      
      request(app)
      .delete( `/todos/${todos[1]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end((err,res) => {

        if(err){
          return done(err);
        }

        Todo.findById(todos[1]._id.toHexString()).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));

      });
      
    });

    it('should return 404 if todo not found',(done) => {

       var idHex = new ObjectID().toHexString();

      request(app)
      .delete( `/todos/${idHex}`)
      .expect(404)
      .end(done);

    });

    it('should return 404 if not-Object ID',(done) => {
      
                  
            request(app)
            .delete( `/todos/12457`)
            .expect(404)
            .end(done);
      
          });

  });