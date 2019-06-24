const UniqueTokenStrategy =  require('passport-unique-token').Strategy
const passport = require('passport');
const strategyOptions = {
  tokenQuery:    'custom-token',
  tokenParams:     'custom-token',
  tokenField:     'custom-token',
  tokenHeader:     'custom-token',
  failedOnMissing: false
};


passport.use(new UniqueTokenStrategy(strategyOptions,(token, done)=> {
  return done(null, {venue:'codeworks', id:123})
  }
    
  ));