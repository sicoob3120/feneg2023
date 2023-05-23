import { Copyright } from '@mui/icons-material'
import { Container, Grid, Paper } from '@mui/material'
import Layout from '../components/layout'
import Head from 'next/head'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>HOME - FENEG 2023 - Sicoob Frutal</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >

            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Layout>
  )
}
