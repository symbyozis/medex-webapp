import { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "@/shared/ui";
import { Box, Container, Grid, Typography } from "@mui/material";

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";

const services = [
  {
    title: 'Терапия',
    description: 'Приём терапевта — первичная консультация, диагностика, лечение острых и хронических заболеваний, профилактические осмотры, направления к узким специалистам.',
    icon: '/page-main/icon-02.png',
  },
  {
    title: 'Гинекология',
    description: 'Консультация гинеколога, плановые и внеплановые осмотры, УЗИ органов малого таза, наблюдение беременности, назначение лечения.',
    icon: '/page-main/icon-01.png',
  },
  {
    title: 'Урология',
    description: 'Диагностика и лечение урологических заболеваний у взрослых. Первичный и повторный приём, расшифровка анализов, составление плана лечения.',
    icon: '/page-main/icon-03.png',
  },
  {
    title: 'Лабораторная диагностика',
    description: 'Общий анализ крови, мочи, биохимия и другие исследования. Результаты — в кратчайшие сроки непосредственно в клинике.',
    icon: '/page-main/icon-04.png',
  },
  {
    title: 'УЗИ-диагностика',
    description: 'Ультразвуковое исследование органов брюшной полости, малого таза и других зон. Современное оборудование, квалифицированный специалист.',
    icon: '/page-main/icon-04.png',
  },
]

const ServicesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Медицинские услуги — клиника «Здоровье+» в Назрани</title>
        <meta name="description" content="Терапия, гинекология, урология, лабораторная диагностика и УЗИ в клинике «Здоровье+» в Назрани, Республика Ингушетия. Запись: +7 928 799-73-99." key="description" />
        <meta name="keywords" content="услуги клиники Назрань, терапия Назрань, гинекология Назрань, урология Назрань, УЗИ Назрань, анализы Назрань, лаборатория Назрань" />
        <link rel="canonical" href={`${SITE_URL}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content="Медицинские услуги — клиника «Здоровье+» в Назрани" />
        <meta property="og:description" content="Терапия, гинекология, урология, лабораторная диагностика и УЗИ в клинике «Здоровье+» в Назрани." />
        <meta property="og:url" content={`${SITE_URL}/services`} />
      </Head>
      <PageLayout title="Услуги">
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 1 }}>
            Наши услуги
          </Typography>
          <Typography sx={{ mb: 5, color: '#585858' }}>
            По вопросам стоимости — уточняйте по телефону{' '}
            <a href="tel:+79287997399">+7 928 799-73-99</a>
          </Typography>
          <Grid container spacing={3}>
            {services.map(service => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.title}>
                <Box sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid rgba(133,150,167,0.36)',
                  borderRadius: 'var(--border-radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}>
                  <Box
                    component="img"
                    src={service.icon}
                    alt={service.title}
                    sx={{ width: 48, height: 48, objectFit: 'contain' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: '#585858', fontSize: 14 }}>
                    {service.description}
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

export default ServicesPage;
