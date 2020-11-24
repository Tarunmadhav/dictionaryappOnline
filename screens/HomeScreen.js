import { render } from "react-dom";
import { Text, View, TouchableOpacity, TextInput, Searchbutton,TextComponent, StyleSheet} from 'react-native';
export default class HomeScreen extends React.Component{
  getWord=(word)=>{
    var searchKeyWord=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"+searchKeyWord+".json"
    return fetch(url)
    .then((data)=>{
    if(data.status===200)
    {
        return data.json()
    }
    else{
        return null
    }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definations[0]
        var defination=wordData.description
        var lexicalCategory=wordData.wordtype
        this.setState({
          "word":this.state.text,
          "defination":defination,
          "lexicalCategory":lexicalCategory
        })
      }
      else{
        this.setState({
          "word" : this.state.text,
        "defination" : "Not Found",
        })
        
      }
    })
  
    }
        

  render() {
        return (
          <View>
             <View style={styles.container}>
<Text style={styles.detailsTitle}>
  word:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.word}
</Text>
<Text style={styles.detailsTitle}>
  Type:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.lexicalCategory}
</Text>
<Text style={{flexDIrection:'row',flexWrap:"wrap"}}>
  Defination:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.defination}
</Text>
</View>
          <TextInput
            style={StyleSheet.inputBox}
            onChnageText={text=>{
                this.setState({
                    text:text,
                    isSearchPressed:false,
                    word:"Loading...",
                    lexicalCategory:'',
                    examples:[],
                    defination:""
                });
            }}
            
          value={this.state.text}
          />
            <TouchableOpacity style={StyleSheet.SearchButton}
            onPress={()=>{
this.setState({isSearchPressed:true});
this.getWord(this.state.text)
            }}>
          submit    
          </TouchableOpacity>
          </View>
        )
            
      }
 
    }
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  inputBoxContainer:{
    flex:0.3,
    aliignItems:'center',
    justifyContent:'center'
  },
  inputBox:{
    width:'80%',
    alignSelf:"center",
    height:40
  }
})