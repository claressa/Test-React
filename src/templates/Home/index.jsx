import './styles.css'

import { useEffect, useState, useCallback } from 'react'
import { Posts } from '../../components/Posts'

import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerpage] = useState(2)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerpage >= allPosts.length

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      })
    : posts

  const handleChange = (e) => {
    const { value } = e.target

    setSearchValue(value)
  }

  const loadMorePosts = () => {
    const nextPage = page + postsPerpage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleLoadPosts = useCallback(async (page, postsPerpage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerpage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerpage)
  }, [handleLoadPosts, postsPerpage])

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts.</p>}

      <div className="button-container">
        {!searchValue && <Button onClick={loadMorePosts} text="Load more Posts" disabled={noMorePosts} />}
      </div>
    </section>
  )
}

export default Home
