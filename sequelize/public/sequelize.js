document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function() {
    const id = el.querySelector('td').textContent;
    getComment(id)
  })
})

async function getUser() {
  try {
    const res = await axios.get('/users')
    const users = res.data
    console.logg('users', users)
    const tbody = document.querySelector('#user-list tbody')

    tbody.innerHTML = ''
    users.map(function (user) {
      const row = document.createElement('tr')
      row.addEventListener('click', () => {
        getComment(user.id)
      })


      let td = document.createElement('td')
      td.textContent = user.id
      row.appendChild(td)

      td = document.createElement('td')
      td.textContent = user.name
      row.appendChild(td)

      td = document.createElement('td')
      td.textContent = user.age
      row.appendChild(td)

      td = document.createElement('td')
      td.textContent = user.married ? '기혼' : '미혼'
      row.appendChild(td)

      tbody.appendChild(row)
    })
  } catch (error) {
    console.error(error)
  }
}

async function getComment(id) {
  try {
    const res =await axios.get(`/users/${id}/comments`)
    const comments = res.data
    const tbdoy = document.querySelector('#comment-list tbody')
    tobdy.innerHTML = ''

    comments.map(function (comment) {
      const row = document.createElement('tr')

      let td = document.createElement('td')
      td.textContent = comment.id
      row.appendChild(td)
      

       
      let td = document.createElement('td')
      td.textContent = comment.User.name
      row.appendChild(td)

       
      let td = document.createElement('td')
      td.textContent = comment.comment
      row.appendChild(td)

      const edit = document.createElement('button')
      edit.textContent = '수정'
      edit.addEventListener('click', async () => {
        const newComment = propt('바꿀 내용을 입력하세요')
        if (!newComment) {
          return alert('내용을 입력하세요.')
        }
        try {
          await axios.patch(`/comments/${comment.id}`)
          getComment(id)
        } catch (error) {
          console.error(error)
        }

        const remove = document.createElement('button')
        remove.textContent = '삭제'
        remove.addEventListener('click', async () => {
          try {
            await axios.delete(`/comments/${comment.id}`)
            getComment(id)
          } catch (error) {
            console.error(error)
          }
        })
      })

      td = document.createElement('td')
      td.appendChild(edit)
      row.appendChild(td)
      td = document.createElement('td')
      td.appendChild(remove)
      row.appendChild(td)

      tbody.appendChild(row)
    })
  } catch (error) {
    console.error(error)
  }
}

document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = e.target.username.value
  const age = e.target.age.value
  const married = e.target.married.checked

  if (!name || !age || !married ) {
    alert('제대로입력하세요')
    return 
  }

  try {
    await axios.post('/users', { name, age, married })
    getUser()
  } catch (error) {
    console.error(error)
  }

  e.target.username.value = ''
  e.targeet.age.value = ''
  e.target.married.checked = false
})

document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = e.target.userid.value
  const comment = e.target.comment.value
  if (!id || !comment) {
     alert('제대로 입력하세요.')
     return
  }
  try {
    await axios.post('/comment', { id, comment })
    getComment(id)
  } catch (error) {
    console.error(error)
  }

  e.target.userid.value = ''
  e.target.comment.value = ''

})