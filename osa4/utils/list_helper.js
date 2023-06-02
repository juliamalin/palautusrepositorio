const dummy = (blogs) => {
    return 1
  }

const totalLikes = (array) => {
  const reducer = (sum, array) => {
    return sum + array.likes
  }
  return array.reduce(reducer, 0)
}

const favouriteBlog = (array) => {
  let mostLikes = 0;
  let mostLiked = {};

  for (let i = 0; i < array.length; i++) {
    if (array[i].likes > mostLikes) {
      mostLikes = array[i].likes;
      mostLiked = array[i];
    }
  }

  console.log("tykätyin", mostLiked);
  return mostLiked;
};

  
module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog

}