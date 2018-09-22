const request = require('supertest');
const expect = require('expect');
const {app} = require ('../server');
const {ObjectID} = require('mongodb');

const {Todo} = require('../models/todo');
const {User} = require('../models/user');

const {todos,populateTodos,users,populateUsers} = require('./seed/seed');



// const todos = [
//   { _id : new ObjectID(),
//     text : 'first text for todos',
//     completed : true
//   },
//   { _id : new ObjectID(),
//     text : 'second text for todos'}
// ]

//******************************************************************************/
/**                 Test POST /todos                                        ****/
/*******************************************************************************/
 beforeEach(populateUsers);
 beforeEach(populateTodos);




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

//******************************************************************************/
/**                 Test PATCH /todos/:id                                  ****/
/*******************************************************************************/


describe('PATCH /todos/:id',() => {

it('Should Update  todo by ID',(done) => {

   var text = 'nidhal tnek sayé';
   var completed = true;

  request(app)
  .patch(`/todos/${todos[0]._id.toHexString()}`)
  .send({text,completed})
  .expect(200)
  .expect((res) => {
     expect(res.body.todo.text).toBe(text);
     expect(res.body.todo.completed).toBe(true);
     expect(res.body.todo.completedAt).toBeA('number');


  })
  .end(done);

});


it('should return 404 if todo not found',(done) => {
  
         var idHex = new ObjectID().toHexString();
  
        request(app)
        .patch( `/todos/${idHex}`)
        .expect(404)
        .end(done);
  
      });
  
      it('should return 404 if not-Object ID',(done) => {
        
                    
              request(app)
              .patch( `/todos/12457`)
              .expect(404)
              .end(done);
        
            });
  
    });
//******************************************************************************/
/**                 Test GET /users/me                                     ****/
/*******************************************************************************/


describe('GET /users/me',() => {
  
  it('Should return user if authenticated',(done) => {


    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      
     
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);


    })
    .end(done);

  });


  it('Should return 401 if user not authenticated',(done) => {
    
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      
      expect(res.body).toEqual({});
       

    })
    .end(done)

  });

});


//******************************************************************************/
/**                 Test GET /users/me                                     ****/
/*******************************************************************************/

describe('POST /users',() => {
  
  it('Should create a user ',(done) => {


    let email = 'nidhouch.ferk2kk@gmail.com';
    let password = 'legfsje12';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(200)
    .expect((res) => {
         // console.log(res.headers['x-auth'])
          expect(res.body._id).toExist();
          expect(res.headers['x-auth']).toExist();
          expect(res.body.email).toBe(email);
          
 
    })
    .end((err) => {

       if(err){

        return done(err);
       }

       User.findOne({email}).then((user) => {
        // console.log(user)
         
         expect(user).toExist();
         done();

       }).catch((err) => done(err));


    });

  });


  it('Should not creat user with invalid data',(done) => {

    let email = 'nidhouch.ferhjhj@gmail.com';
    let password = 'legf';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
});

});

//******************************************************************************/
/**                 Test POST /users/login                                  ****/
/*******************************************************************************/

describe('POST /users/login',() => {
  
  it('Should login user and return auth token ',(done) => {

      request(app)
      .post('/users/login')
      .send({email : users[1].email, password : users[1].password})
      .expect(200)
      .expect((res) => {

        expect(res.body._id).toExist();
        expect(res.headers['x-auth']).toExist();
        expect(res.body.email).toBe(users[1].email);     

      })
      .end((err,res) => {

        if(err){
          return done(err);
        }

        User.findById(users[1]._id).then((user) =>{

           expect(user.tokens[0].token).toExist();
           expect(user.tokens[0]).toInclude({
             access :'auth',
             token : res.headers['x-auth']

           });
             done();
        }).catch((err) => done(err));

     });
  });

  it('Should Reject invalid Login ',(done) => {
    
          request(app)
          .post('/users/login')
          .send({email : users[1].email, password : 'nidhhhouh'})
          .expect(400)
          .end(done)

  });



});


