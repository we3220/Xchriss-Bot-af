const axios = require('axios')

async function githubstalk(user) {
    try {
    const dat = await axios.get(`https://api.github.com/users/${user}`)
    const data = dat.data
    let result = {
        username: data.login,
        name: data.name,
        bio: data.bio,
        created_at: data.created_at,
        updated_at: data.updated_at,
        company: data.company,
        email: data.email,
        location: data.location,
        followers: data.followers,
        following: data.following,
        public_repo: data.public_repos,
        public_gists: data.public_gists
    }
    return result
    } catch (error) {
    console.log("Error in ghstalk: ", error)
    return { error: "Failed to fetch GitHub user data" };
}
}

module.exports.githubstalk = githubstalk