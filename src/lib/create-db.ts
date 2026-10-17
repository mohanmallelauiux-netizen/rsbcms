import pg from 'pg'

const defaultUri = 'postgresql://postgres:postgres@127.0.0.1:5432/postgres'
console.log('Connecting to default postgres database...')

const client = new pg.Client({
  connectionString: defaultUri,
})

client.connect()
  .then(() => {
    console.log('Connected to default database. Creating rsbi database...')
    // Execute CREATE DATABASE rsbi
    return client.query('CREATE DATABASE rsbi')
  })
  .then(() => {
    console.log('Database "rsbi" created successfully!')
    client.end()
  })
  .catch((err) => {
    if (err.code === '42P04') {
      console.log('Database "rsbi" already exists. Proceeding...')
    } else {
      console.error('Failed to create database. Error:', err)
    }
    client.end()
  })
