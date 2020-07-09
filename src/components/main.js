import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import DishDetail from './dishDetail';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//local imports
import Menu from './menu';
import Home from './home';
import Contact from './contact';
import Header from './header';
import Footer from './footer';
import About from './about'
import { fetchDishes, fetchComments, fetchLeaders, postComment, postFeedback } from '../redux/actions/actionCreators';

const mapStateToProps = (state)=>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends React.Component{


  DishwithDetail = ({match})=>{
    return(
      <DishDetail 
        dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} 
        comments = {this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
        postComment={this.props.postComment}
        dishesLoading={this.props.dishes.isLoading} 
        dishesError = {this.props.dishes.error}
        />
      );
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }

  render(){    

    const featuredDish = this.props.dishes.dishes.filter((dish)=>dish.featured===true)[0];
    const featuredLeader = this.props.leaders.leaders.filter((leader)=>leader.featured===true)[0];
    const featuredPromotion = this.props.promotions.filter((promo)=>promo.featured===true)[0];

    return ( 
        <>
          <Header />
          <TransitionGroup>
            <CSSTransition key={1} classNames='page' timeout={300}>
              <Switch>     
                  <Route exact path='/home' render={()=><Home featDish={featuredDish} 
                    featLeader = {featuredLeader}
                    featPromotion = {featuredPromotion}
                    dishesLoading={this.props.dishes.isLoading} 
                    leadersLoading={this.props.leaders.isLoading}
                    dishesError = {this.props.dishes.error} />} />
                  <Route exact path='/menu' render={()=><Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component = {this.DishwithDetail} />
                  <Route exact path='/about' render={()=><About leaders={this.props.leaders.leaders} /> } />
                  <Route exact path='/contact' render={() => <Contact postFeedback={this.props.postFeedback} /> } />
                  <Redirect to='/home' />
              </Switch>
          </CSSTransition>
          </TransitionGroup>
          <Footer />
        </>
  );}
}



export default (connect(mapStateToProps, mapDispatchToProps)(Main));
