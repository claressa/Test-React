
import './styles.css';
import { Component } from 'react';
import { Posts } from '../../components/Posts';


import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput'

class Home extends Component {

  state = {
    // counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerpage: 10,
    searchValue: ''
  }

  // timeoutUpdate = null

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerpage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerpage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerpage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerpage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  // componentDidUpdate(){

  // }

  // componentWillUnmount(){

  // }

  // handleTimeOut = () => {
  //   const { posts, counter } = this.state
  //   posts[0].title = 'O título mudou'

  //   this.timeoutUpdate=setTimeout(() => {
  //     this.setState({ posts, counter: counter + 1 })
  //   }, 1000)
  // }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    // const { posts, counter } = this.state
    const { posts, page, postsPerpage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerpage >= allPosts.length
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })

      : posts

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (

            <h1>Search Value: {searchValue}</h1>

          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts.</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              onClick={this.loadMorePosts}
              text="Load more Posts"
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
}

export default Home

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
