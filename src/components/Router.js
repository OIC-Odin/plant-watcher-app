import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Spinner, IconWrapper } from './common';
import LoginFormContainer from '../containers/LoginFormContainer';
import RegistrationFormContainer from '../containers/RegistrationFormContainer';
import AddArticleContainer from '../containers/AddArticleContainer';
import ArticleSearchContainer from '../containers/ArticleSearchContainer';
import ListArticlesContainer from '../containers/ListArticlesContainer';
import firebase from 'firebase';
import CameraContainer from '../containers/CameraContainer';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(user => user ? Actions.main() : Actions.auth());
};

const RouterComponent = ({ pageMoved, fetchArticles }) => (
  <Router getSceneStyle={()=>({ backgroundColor: '#fff' })}>
    <Scene key='root' hideNavBar={true}>
      <Scene key='loading' onEnter={checkLoginStatus} component={Spinner}/>
      <Scene
        key='auth'
        tabs={true}
        tabBarPosition='bottom'
        activeBackgroundColor='#fff'
        activeTintColor='#2C9D46'
        inactiveBackgroundColor='#fff'
        inactiveTintColor='gray'
        tabBarStyle={{ backgroundColor: '#fff' }}
        hideNavBar={true}
        labelStyle={{ fontSize: 15 }}
      >
        <Scene
          hideNavBar={true}
          title='検索'
          tabBarLabel='検索'
          key='articlesearch'
          component={ArticleSearchContainer}
          icon={IconWrapper}
          type='simple-line-icon'
          name='magnifier'
        />
        <Scene
          key='login'
          onExit={pageMoved}
          component={LoginFormContainer}
          title='ログイン'
          tabBarLabel='ログイン'
          panHandlers={null}
          name='login'
          type='simple-line-icon'
          icon={IconWrapper}
        />

        <Scene
          key='registration'
          onEnter={pageMoved}
          component={RegistrationFormContainer}
          title='ユーザー登録'
          tabBarLabel='登録'
          name='note'
          type='simple-line-icon'
          icon={IconWrapper}
        />
      </Scene>
      <Scene key='main'>
        <Scene
          key='mainwithtabs'
          tabs
          showLabel={false}
          panHandlers={null}
          activeBackgroundColor='#fff'
          activeTintColor='#2C9D46'
          inactiveBackgroundColor='#fff'
          inactiveTintColor='gray'
          tabBarStyle={{ backgroundColor: '#fff' }}
        >
          <Scene
            initial
            hideNavBar={true}
            key='articlesearch'
            component={ArticleSearchContainer}
            icon={IconWrapper}
            type='simple-line-icon'
            name='magnifier'
          />
          <Scene
            key='addarticle'
            component={AddArticleContainer}
            title='記事投稿'
            icon={IconWrapper}
            type='simple-line-icon'
            name='note'
          />
          <Scene
            key='bookmarks'
            component={Spinner}
            title='ブックマーク'
            icon={IconWrapper}
            type='font-awesome'
            name='bookmark-o'
          />
          <Scene
            key='listarticles'
            component={ListArticlesContainer}
            title='ユーザー記事一覧'
            icon={IconWrapper}
            type='simple-line-icon'
            name='user'
            onEnter={fetchArticles}
          />
        </Scene>
        <Scene key='searchresults' component={ListArticlesContainer} title='検索結果'/>
        <Scene key='camera' component={CameraContainer} title='写真の撮影'/>
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
