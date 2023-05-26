import { Copyright } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Container, Divider, List, ListItem, Typography } from '@mui/material'
import Layout from '@/components/layout'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
import { LoadingButton } from '@mui/lab'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import WinnerCard from '@/components/winnerCard'
dayjs.extend(customParseFormat)

const fetcher = url => axios.get(url).then(res => res.data)

export default function RaffleDay() {
    const router = useRouter();
    const [alertError, setAlertError] = useState(false)
    const dia = router.query.day;
    const [winner, setWinner] = useState()
    const day = dayjs(dia, 'DD-MM-YYYY')
    // const { data: dataWinner, error: dateError, isLoading: loadingDate } = useSWR(`/api/raffle/getWinners/${router.query.day}`, fetcher, { refreshInterval: 1000 })
    const { data: session, status } = useSession()
    if (!session?.user.adm) {
        return (<Layout><Typography>Não autorizado!</Typography></Layout>)
    }

    // if (dateError) return <div>Erro ao carregar!</div>
    // if (loadingDate) return <Layout><CircularProgress /></Layout>

    const handleRaffle = async () => {
        try {
            const getWinner = await axios.post(`/api/raffle/getPresenceCount`, { dia: day.toDate() })
            console.log(getWinner.data.image);
            setWinner(getWinner.data)

        } catch (error) {
            if (error.response.status === 409) {
                setAlertError(true)
            }
        }

    }

    // const winners = dataWinner.map(winner => {
    //     return (
    //         <React.Fragment key={winner.id}>
    //             <ListItem>{winner.user.name} - {dayjs(winner.data).format('DD/MM/YYYY HH:mm:ss')}</ListItem>
    //             <Divider />
    //         </React.Fragment>
    //     )
    // })


    return (
        <Layout>
            <Head>
                <title>HOME - FENEG 2023 - Sicoob Frutal</title>
            </Head>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant='h4'>
                    {dayjs(day).format('DD/MM/YYYY')}
                </Typography>
                <Button fullWidth variant="contained" onClick={handleRaffle} sx={{ m: 1 }}>Sortear</Button>
                {alertError ? <Alert severity="error">Não há mais nenhum usuário que cumpra os requisitos para ser sorteado nesse dia!</Alert> : null}
                {winner ? <WinnerCard name={winner.name} phone={winner.phone} photo={winner.image} /> : false}
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Layout>
    )
}

