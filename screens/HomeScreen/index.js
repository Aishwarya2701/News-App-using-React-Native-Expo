import axios from 'axios'
import React, { Component } from 'react'
import { Image, Linking, ScrollView, Text, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

import Header from '../../components/AppBar'

export default class HomeScreen extends Component {
    
    state = {
        articles: [],
        isLoading: true,
        errors: null
    };

    getArticles() {
        axios
          .get(
            "https://newsapi.org/v2/everything?q=bitcoin&apiKey=18ee983d092249d8a3a702ec78651eba"
            )
          .then(response =>
            response.data.articles.map(article => ({
              date: `${article.publishedAt}`,
              title: `${article.title}`,
              url: `${article.url}`,
              description: `${article.description}`,
              urlToImage: `${article.urlToImage}`,
            }))
          )
          .then(articles => {
            this.setState({
              articles,
              isLoading: false
            });
          })
          .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getArticles();
    }


    render(){
        const{ isLoading, articles } = this.state;
        return (
            <View>
                <Header/>
                <ScrollView>
                    {!isLoading ? (
                        articles.map(article => {
                        const {date, title, url, description, urlToImage} = article;
                        return(
                            <Card key={url} style={{marginTop:10, borderColor:'black', borderRadius:5, borderBottomWidth:1}}
                            onPress={()=>{Linking.openURL(`${url}`)}}
                            >
                                <View style={{flexDirection:'row',}}>
                                    {/*  Text */}
                                    <View style={{justifyContent:'space-around', flex:2/3, margin:10}}>
                                        <Title>{title}</Title>
                                    </View>
                                    {/*  Image */}
                                    <View style={{flex:1/3, margin:10}}>
                                                    {urlToImage && (
                                     <Image style={{width:120, height:120}} source={{uri: urlToImage}} />
                                    )}
                                    </View>
                                </View>
                                <View style={{margin:10}}>
                                    <Paragraph>{description}</Paragraph>
                                    <Text>Published At: {date}</Text>
                                </View>
                            </Card>
                        );
                    })
                    ) : (
                    <Text style={{justifyContent:'center', alignItems:'center'}}>Loading...</Text>
                    )}
                </ScrollView>
            </View>
        )
    }
}