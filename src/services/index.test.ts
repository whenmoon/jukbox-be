import 'mocha';
import chai from 'chai'; 
var request = require('supertest');
var server = request.agent('http://localhost:4000');
chai.should();

// describe('Spotify login testing', () => {
//   describe('GET /login/admin', function(){
//     it('uri that requires user to be logged in', function(done){
//     server
//         .get('/login/admin') 
//         .send('')                      
//         .end(function(err, res){
//             if (err) return done(err);
//             console.log(res.body);
//             done()
//         });
//     });
//   });

  
// });