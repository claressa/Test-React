export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
  const photosresponse = fetch('https://jsonplaceholder.typicode.com/photos')
  const [posts, photos] = await Promise.all([postsResponse, photosresponse])

  const postsJson = await posts.json()
  const photosJson = await photos.json()

  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  })

  return postsAndPhotos
}
