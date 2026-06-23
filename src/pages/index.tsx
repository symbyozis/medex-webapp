import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from 'react';

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";

const HOME_TITLE = "Клиника «Здоровье+» — Назрань | Терапия, Гинекология, УЗИ, Лаборатория";
const HOME_DESCRIPTION = "Многопрофильная клиника «Здоровье+» в Назрани. Терапия, гинекология, урология, УЗИ и лабораторная диагностика. 26 лет опыта с 1999 года. Запись: +7 928 799-73-99.";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": `${SITE_URL}/#clinic`,
  name: "Клиника «Здоровье+»",
  alternateName: "Здоровье плюс",
  url: SITE_URL,
  telephone: "+79287997399",
  email: "zdorplus@bk.ru",
  foundingDate: "1999",
  description: HOME_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. И. Зязикова, 30",
    addressLocality: "Назрань",
    addressRegion: "Республика Ингушетия",
    addressCountry: "RU",
  },
  sameAs: [
    "https://www.instagram.com/zdorplus",
    "https://t.me/zdorplus",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Медицинские услуги",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Терапия" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Гинекология" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Урология" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "УЗИ-диагностика" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Лабораторная диагностика" } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Вызов врача на дом" } },
    ],
  },
};
import { Container, Button, Typography, Box, Card, TextField, MenuItem, Grid, Alert, CircularProgress } from '@mui/material';
import {
  MainLayout,
  SectionLayout,
  CarouselMain,
  CarouselDoctors,
  ServiceItem,
  IServiceItem,
  Checkup,
  ICheckup,
  CarouselReviews,
  CarouselNews,
} from "@/shared/ui";

const serviceItems: IServiceItem[] = [
  {
    image: '/page-main/icon-05.png',
    title: 'Терапия',
    text: 'Приём терапевта: диагностика, лечение и наблюдение.',
  },
  {
    image: '/page-main/icon-07.png',
    title: 'Гинекология',
    text: 'Консультации и осмотр в комфортных условиях.',
  },
  {
    image: '/page-main/icon-06.png',
    title: 'Урология',
    text: 'Диагностика и лечение урологических заболеваний.',
  },
  {
    image: '/page-main/icon-04.png',
    title: 'УЗИ и лабораторная диагностика',
    text: 'Точные анализы и УЗИ — без лишних очередей.',
  },
]

const checkups: ICheckup[] = [
  {
    image: 'https://placehold.co/900', // TODO: фото для чекапа
    name: 'Базовый',
    price: null, // TODO: уточнить цену
    points: ['Приём терапевта', 'Общий анализ крови', 'Общий анализ мочи', 'Консультация по результатам'],
    link: 'services'
  },
  {
    image: 'https://placehold.co/900', // TODO: фото для чекапа
    name: 'Женское здоровье',
    price: null, // TODO: уточнить цену
    points: ['Приём гинеколога', 'УЗИ органов малого таза', 'Лабораторные анализы', 'Консультация по результатам'],
    link: 'services'
  },
  {
    image: 'https://placehold.co/900', // TODO: фото для чекапа
    name: 'Комплексный',
    price: null, // TODO: уточнить цену
    points: ['Терапевт + Гинеколог', 'УЗИ-диагностика', 'Лабораторные анализы', 'Полная консультация'],
    link: 'services'
  },
]

const DOCTORS = ['Терапевт', 'Гинеколог', 'Уролог']

const HomePage: NextPage = () => {
  const [name, setName] = useState('')
  const [doctor, setDoctor] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !doctor || !appointmentDate || !birthDate || !phone.trim()) {
      setStatus('error')
      setErrorText('Пожалуйста, заполните все обязательные поля')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'appointment', name, doctor, appointmentDate, birthDate, phone, email }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setDoctor('')
        setAppointmentDate('')
        setBirthDate('')
        setPhone('')
        setEmail('')
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorText(data.error || 'Ошибка отправки')
      }
    } catch {
      setStatus('error')
      setErrorText('Не удалось отправить. Проверьте соединение.')
    }
  }

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} key="description" />
        <meta name="keywords" content="клиника Назрань, медицинская клиника Ингушетия, терапевт Назрань, гинеколог Назрань, уролог Назрань, УЗИ Назрань, анализы Назрань, вызов врача на дом Назрань" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="RU-IN" />
        <meta name="geo.placename" content="Назрань" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />
      </Head>
      <MainLayout>
      <Box sx={{ pb: { xs: 3, md: 5 } }}>
        <Container>
          <CarouselMain />
        </Container>
      </Box>
      <Box sx={{ py: { xs: 3, md: 5 } }} className="bg-[#F5F8F9]">
        <Container>
          <Grid container spacing={3} alignItems={"center"}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
                Почему пациенты выбирают нашу клинику?
              </Typography>
              <Typography sx={{ my: { xs: 2, md: 4 } }}>
                Клиника «Здоровье+» работает с 1999 года. За 26 лет мы принимаем терапевт, гинеколог и уролог — те, кого вы знаете по имени, а не по номеру талона.
              </Typography>
              <Button variant="contained" sx={{ mb: { xs: 3, md: 0 } }} href="/about">Подробнее о нас</Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }} offset={{ xs: 0, md: 1 }}>
              <Grid container spacing={{ xs: 0, md: 0 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'end' },
                    pr: { xs: 0, md: 3 },
                    gap: 2
                  }}>
                    {serviceItems.filter((_, i) => i < 2).map(item => (
                      <ServiceItem key={item.title} {...item} />
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>
                  <Box sx={{
                    pt: { xs: 0, md: 5 },
                    mt: { xs: 0, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: 2
                  }}>
                    {serviceItems.filter((_, i) => i >= 2).map(item => (
                      <ServiceItem key={item.title} {...item} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SectionLayout title="Наши чекапы">
        <Grid container spacing={3} alignItems={"center"}>
          {checkups.map((checkup, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={checkup.name} sx={{
              '&:nth-of-type(2)': {
                transform: { xs: 'none', md: 'scaleY(1.1)' }
              },
            }}>
              <Checkup {...checkup} />
            </Grid>
          ))}
        </Grid>
      </SectionLayout>
      <SectionLayout title="Наши доктора">
        <CarouselDoctors />
      </SectionLayout>
      <SectionLayout title="Записаться на прием">
        <Card
          component="form"
          onSubmit={handleSubmit}
          sx={{
            py: { xs: 3, md: 10 },
            px: { xs: 2, md: 0 },
            border: '1px solid rgba(133, 150, 167, 0.36)',
            boxShadow: 'none',
            borderRadius: { xs: '10px', md: '20px' }
          }}
        >
          <Grid container alignItems="center">
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://placehold.co/900"
                sx={{
                  width: '100%',
                  borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                  objectFit: 'cover'
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }} sx={{ px: { xs: 2, md: 5 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      ФИО <Box component="span" sx={{ color: 'red' }}>*</Box>
                    </Box>
                    <TextField size="small" fullWidth value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }} />
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Доктор <Box component="span" sx={{ color: 'red' }}>*</Box>
                    </Box>
                    <TextField select size="small" fullWidth value={doctor} onChange={e => setDoctor(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }}>
                      {DOCTORS.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Дата приема <Box component="span" sx={{ color: 'red' }}>*</Box>
                    </Box>
                    <TextField type="date" size="small" fullWidth value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }} />
                  </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Дата рождения <Box component="span" sx={{ color: 'red' }}>*</Box>
                    </Box>
                    <TextField type="date" size="small" fullWidth value={birthDate} onChange={e => setBirthDate(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }} />
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Телефон <Box component="span" sx={{ color: 'red' }}>*</Box>
                    </Box>
                    <TextField size="small" fullWidth value={phone} onChange={e => setPhone(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }} />
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Email
                    </Box>
                    <TextField size="small" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }} />
                  </div>
                </Grid>
                {status === 'success' && (
                  <Grid size={12}>
                    <Alert severity="success">Запись создана! Мы свяжемся с вами для подтверждения.</Alert>
                  </Grid>
                )}
                {status === 'error' && (
                  <Grid size={12}>
                    <Alert severity="error">{errorText}</Alert>
                  </Grid>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={status === 'loading'}
                  startIcon={status === 'loading' ? <CircularProgress size={18} color="inherit" /> : null}
                  sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                  {status === 'loading' ? 'Отправка...' : 'Создать запись'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </SectionLayout>
      <SectionLayout title="Отзывы" container={false}>
        <CarouselReviews />
      </SectionLayout>
      <Box id="news">
        <SectionLayout title="Наши новости" container={false} mobilePadding>
          <Box sx={{
            marginLeft: {
              xs: '0',
              md: 'calc((100% - min(90%, 70.5rem))/2)'
            },
            overflow: 'hidden'
          }}>
            <CarouselNews />
          </Box>
        </SectionLayout>
      </Box>
      <Box component="section" sx={{ height: { xs: '300px', md: '450px' } }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11625.100768565688!2d44.8098561!3d43.245654!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb3f5e856b63c4858!2z0JfQtNC-0YDQvtCy0YzQtSDQv9C70Y7RgQ!5e0!3m2!1sru!2sru!4v1673267497613!5m2!1sru!2sru"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </MainLayout>
    </>
  );
}

export default HomePage;
