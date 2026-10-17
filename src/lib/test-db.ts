import pg from 'pg'

const uri = process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/rsbi'
console.log('Attempting connection with URI:', uri)

const client = new pg.Client({
  connectionString: uri,
})

client.connect()
  .then(() => {
    console.log('Connection test succeeded!')
    return client.query('SELECT version()')
  })
  .then((res) => {
    console.log('Postgres Version:', res.rows[0].version)
    client.end()
  })
  .catch((err) => {
    console.error('Connection test failed. Error detail:', err)
    client.end()
  })
