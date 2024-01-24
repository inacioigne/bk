import styles from './page.module.css'
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <main className={styles.main}>
     
       <Container>
       <h1>{process.env.BASE_URL}</h1>

       </Container>
       
    </main>
  )
}