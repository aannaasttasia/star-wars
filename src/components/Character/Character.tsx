import * as React from "react";
import { Component } from "react";
import { CharacterType } from "../../features/characters/charactersSlice";
import './css/Character.scss'


class Character extends React.Component<{character: CharacterType}> {
  
  render() {
    return (
      <li className="list-item">
        <h1 className="list-item__name">{this.props.character.name}</h1>
        <p className="list-item__height">Height:{this.props.character.height}</p>
        <p>Hair color:{this.props.character.hair_color}</p>
        <p>Mass:{this.props.character.mass}</p>


      </li>
    );
  }
}

export default Character;
