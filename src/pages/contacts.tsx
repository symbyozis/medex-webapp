import React, { useState } from 'react'
import { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "@/shared/ui";

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";
import { Grid, Box, Button, Container, FormControl, List, ListItem, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import appConfig from '@/shared/config/app.config.json'
import { phoneFormat } from "@/shared/lib";

const WHATSAPP_NUMBER = appConfig.contacts.phone.replace(/\D/g, '')

const ContactsPage: NextPage = () => {
  const { contacts } = appConfig

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  const whatsappText = encodeURIComponent(
    `Здравствуйте! Пишу с сайта.\nИмя: ${name || '—'}\nТелефон: ${phone || '—'}\nСообщение: ${message || '—'}`
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      setStatus('error')
      setErrorText('Пожалуйста, заполните имя и сообщение')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setPhone('')
        setMessage('')
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
        <title>Контакты клиники «Здоровье+» — Назрань, ул. Зязикова, 30</title>
        <meta name="description" content="Адрес клиники «Здоровье+»: г. Назрань, ул. Зязикова, 30. Телефон: +7 928 799-73-99. График: пн–пт 9:00–15:00, суббота 9:00–13:00." key="description" />
        <meta name="keywords" content="контакты клиники Назрань, адрес клиника Назрань, телефон клиники Здоровье, как доехать до клиники Назрань" />
        <link rel="canonical" href={`${SITE_URL}/contacts`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content="Контакты клиники «Здоровье+» — Назрань, ул. Зязикова, 30" />
        <meta property="og:description" content="г. Назрань, ул. Зязикова, 30. Телефон: +7 928 799-73-99. Режим работы: пн–пт 9:00–15:00, суббота 9:00–13:00." />
        <meta property="og:url" content={`${SITE_URL}/contacts`} />
      </Head>
      <PageLayout title="Контакты">
      <Box
        sx={{
          padding: '100px 0',
          background: `url(./page-contacts/cable-call-communication.png) no-repeat center / cover`,
        }}
      >
        <Container>
          <Grid container>
            <Grid size={{ md: 5 }}>
            </Grid>
            <Grid size={{ md: 7 }}>
              <div>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: 36,
                    color: 'var(--heading-color)',
                    '&::before': {
                      content: '""',
                      clear: 'both',
                      display: 'table',
                      height: '3px',
                      width: '50px',
                      backgroundColor: 'var(--primary-color)',
                      margin: '4px 0'
                    }
                  }}
                >
                  Наши контакты
                </Typography>
                <Grid container sx={{ marginTop: '30px' }}>
                  <Grid size={{ md: 5 }} component="address" sx={{ fontStyle: 'normal' }}>
                    <List sx={{ width: 'max-content' }}>
                      <ListItem sx={{ p: '0', lineHeight: '30px', fontSize: '14px', fontWeight: '500', color: '#585858' }}>
                        <Box component="span" sx={{ width: '100px' }}>Email</Box>
                        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                      </ListItem>
                      <ListItem sx={{ p: '0', lineHeight: '30px', fontSize: '14px', fontWeight: '500', color: '#585858' }}>
                        <Box component="span" sx={{ width: '100px' }}>Телефон</Box>
                        <a href={`tel:${contacts.phone}`}>{phoneFormat(contacts.phone)}</a>
                      </ListItem>
                      <ListItem sx={{ p: '0', lineHeight: '30px', fontSize: '14px', fontWeight: '500', color: '#585858' }}>
                        <Box component="span" sx={{ width: '100px' }}>Адрес</Box>
                        <a href={appConfig.contacts.google_map_link}>{contacts.address}</a>
                      </ListItem>
                      <ListItem sx={{ p: '0', lineHeight: '30px', fontSize: '14px', fontWeight: '500', color: '#585858' }}>
                        <Box component="span" sx={{ width: '100px' }}>Telegram</Box>
                        <a href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer">
                          @{contacts.telegram}
                        </a>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </div>
              <Box sx={{ marginTop: '40px' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: 36,
                    color: 'var(--heading-color)',
                    '&::before': {
                      content: '""',
                      clear: 'both',
                      display: 'table',
                      height: '3px',
                      width: '50px',
                      backgroundColor: 'var(--primary-color)',
                      margin: '4px 0'
                    }
                  }}
                >
                  Напишите нам
                </Typography>
                <FormControl
                  sx={{ marginTop: '30px', width: '450px' }}
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Имя *
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={name}
                      onChange={e => setName(e.target.value)}
                      sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }}
                    />
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Телефон
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }}
                    />
                  </div>
                  <div>
                    <Box component="label" sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '30px', color: '#585858' }}>
                      Сообщение *
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      rows={5}
                      maxRows={10}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      sx={{ mb: 2, background: 'rgba(var(--input-bg), .15)' }}
                    />
                  </div>

                  {status === 'success' && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                    </Alert>
                  )}
                  {status === 'error' && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {errorText}
                    </Alert>
                  )}

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: '10px' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={status === 'loading'}
                      startIcon={status === 'loading' ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                      {status === 'loading' ? 'Отправка...' : 'Отправить'}
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderColor: '#25D366', color: '#25D366', '&:hover': { borderColor: '#1da851', color: '#1da851' } }}
                    >
                      WhatsApp
                    </Button>
                  </Box>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PageLayout>
    </>
  )
}

export default ContactsPage;
