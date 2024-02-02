import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CharacterType,
  fetchPosts,
  selectAllCharacters,
  selectStatus,
  selectPageNumber,
  fetchCount,
  selectCount
} from "../../features/characters/charactersSlice";
import Character from "../Character/Character";
import Pagination from "../Pagination/Pagination";
import './css/CharacterList.scss';
import LoaderComponent from "./Loader";


const fetchData = async (dispatch: any, currentPage: number) => {
  try {
    await dispatch(fetchPosts(currentPage));
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const fetchPagesCount = async (dispatch: any) => {
  try {
    await dispatch(fetchCount());
  } catch (error) {
    console.error("Error fetching count:", error);
  }
};


const CharactersList = () => {
  const dispatch = useDispatch<any>();

  const characters = useSelector(selectAllCharacters);
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectPageNumber)
  const count = useSelector(selectCount)


  useEffect(() => {
    fetchPagesCount(dispatch)
    fetchData(dispatch, currentPage)
  }, [dispatch, currentPage]);


  const renderCharacters = () => {
    return (
      <section className="characters-list">
        {characters.map((character: CharacterType) => {
          return (
            <div key={character.name} className="character-card">
              <Character character={character} />
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <main className="characters">
      <h1 className="characters__title">Find your favourite Star Wars character</h1>
      <ul className="characters-section">{status=='succeeded' ? renderCharacters() : <div className="loader-container"><LoaderComponent/></div>}</ul>
      <Pagination currentPage={currentPage} totalCount={count}/>
    </main>
  );
};

export default CharactersList;
