import React from "react";

class CandidateList extends React.Component{
    render(){
        return(
            this.props.candidates.map((word, i) => <li key={'candword-'+i.toString()}>{word}</li>)
        )
    }
}
export default CandidateList;