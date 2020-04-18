const app = require("../src/app");
const expect = require('chai').expect;

describe("App", () => {
	it('GET / responds with 200 containing "Hello, world!"', () => {
		return supertest(app)
			.get("/")
			.expect(200, "Hello, world!");
	});
});


const handleSubmit = require('../names/names-router');

describe('handleSubmit', () => {
  it('should add one to the number of votes for the id', () => {
    // define inputs
    const votes = 0,
      updatedVotes = votes ++,
      expectedAnswer = Votes ++;

    // invoke the function
    const actualAnswer = handleSubmit(votes, votes++);

    // assert that expected === actual
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('should throw an error when no votes++ happens', () => {
    // define inputs
    const votes = 8, votes++ = 0;

    // set up the function call
    const fn = () => { handleSubmit(votes, votes++) };

    // assert that exception is thrown
    expect(fn).to.throw();
  });
});