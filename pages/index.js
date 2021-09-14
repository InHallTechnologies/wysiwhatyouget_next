import Head from 'next/head'
import Image from 'next/image'
import RichTextEditor from '../components/RichTextEditor.component'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <div className={styles.container}>
      
      <RichTextEditor />
    </div>
  )
}
