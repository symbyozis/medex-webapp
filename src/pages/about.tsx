import React from 'react'
import { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "@/shared/ui";
import { Box, Container, Grid, Typography } from "@mui/material";

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>О клинике «Здоровье+» — 26 лет в Назрани | Ингушетия</title>
        <meta name="description" content="Клиника «Здоровье+» в Назрани работает с 1998 года. Терапевт, гинеколог, уролог, лаборатория и УЗИ под одной крышей. 26 лет заботимся о здоровье жителей Ингушетии." key="description" />
        <meta name="keywords" content="клиника Назрань, медицинская клиника Ингушетия, Здоровье плюс, о клинике, клиника с 1998" />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content="О клинике «Здоровье+» — 26 лет в Назрани | Ингушетия" />
        <meta property="og:description" content="Клиника «Здоровье+» в Назрани работает с 1998 года. Терапевт, гинеколог, уролог, лаборатория и УЗИ под одной крышей." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
      </Head>
    <PageLayout title="О нас">
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 3 }}>
                Клиника «Здоровье+» — 26 лет рядом с вами
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Мы работаем с 1998 года. За это время тысячи пациентов из Назрани и Республики
                Ингушетия доверили нам своё здоровье. Наш принцип не изменился: внимательный
                врач, точная диагностика, честный разговор о здоровье.
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Клиника «Здоровье+» — это многопрофильный центр, где терапевт, гинеколог и уролог
                работают под одной крышей вместе с собственной лабораторией и кабинетом УЗИ.
                Вам не нужно ездить в разные места: всё необходимое — здесь.
              </Typography>
              <Typography>
                Мы принимаем ежедневно, кроме воскресенья: понедельник–пятница с 9:00 до 15:00,
                суббота с 9:00 до 13:00.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="https://placehold.co/700x500" // TODO: фото клиники / команды
                alt="Клиника Здоровье+"
                sx={{ width: '100%', borderRadius: 'var(--border-radius)' }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: { xs: 4, md: 8 } }}>
            {[
              { value: '26', label: 'лет на рынке' },
              { value: '3', label: 'специализации' },
              { value: '1', label: 'собственная лаборатория' },
              { value: '6', label: 'дней в неделю' },
            ].map(item => (
              <Grid size={{ xs: 6, md: 3 }} key={item.label}>
                <Box sx={{ textAlign: 'center', p: 3, border: '1px solid rgba(133,150,167,0.3)', borderRadius: 'var(--border-radius)', height: '100%' }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ mt: 1, color: '#585858' }}>
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageLayout>
    </>
  )
}

export default AboutPage;
