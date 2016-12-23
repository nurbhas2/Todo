//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Test', function() {
  it('/GET index.html');
  it('/GET 404');
  it('/GET users');
});

it('it should GET the index.html file', (done) => {
	chai.request(server)
		.get('/index.html')
		.end((err, res) => {
			res.should.have.status(200);
			res.should.be.html;
		done();
		});
});




it('it should return 404', (done) => {
	chai.request(server)		.get('/index2.html')
		.end((err, res) => {
			res.should.have.status(404);
		done();
		});
});

describe('/GET users', () => {
	it('it should GET all the users', (done) => {
		chai.request(server)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(3);
				res.body[0].should.be.a('object');
 				res.body[0].should.have.property('name');
				res.body[0].should.have.property('email');
				res.body[0].name.should.be.a('string');
				res.body[0].name.should.equal('John'); 
			done();
			});
	});
});