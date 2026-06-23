import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PageLayout } from "@/shared/ui";
import { phoneFormat } from "@/shared/lib";
import appConfig from "@/shared/config/app.config.json";

// TODO: заменить на реальный продакшн-домен, когда будет подключён (нужен для canonical/OG)
const SITE_URL = "https://medex-22115.web.app";
const PAGE_URL = `${SITE_URL}/call-doctor`;
const PAGE_TITLE = "Вызов врача на дом в Назрани — клиника «Здоровье+»";
const PAGE_DESCRIPTION =
  "Вызов врача на дом в Назрани и Республике Ингушетия. Опытный терапевт приедет на дом: осмотр, диагностика, назначение лечения, забор анализов. Работаем с 1999 года. Запишитесь по телефону +7 928 799-73-99.";

const { contacts } = appConfig;
const phone = phoneFormat(contacts.phone);

const benefits = [
  {
    title: "Без поездки в клинику",
    text: "Врач сам приедет к вам домой — не нужно стоять в очереди и сидеть в общем коридоре с другими пациентами.",
  },
  {
    title: "Опытный терапевт",
    text: "Принимаем с 1999 года. На дом выезжает врач, который проведёт полноценный осмотр и назначит лечение.",
  },
  {
    title: "Осмотр и анализы на месте",
    text: "При необходимости — забор анализов на дому и выдача направлений на дальнейшую диагностику.",
  },
  {
    title: "Удобное время",
    text: "Согласуем визит на удобный для вас день и час в рамках режима работы клиники.",
  },
];

const indications = [
  "Высокая температура, симптомы ОРВИ и гриппа",
  "Резкое повышение или понижение давления",
  "Боли, слабость, головокружение, когда трудно добраться до клиники",
  "Обострение хронических заболеваний",
  "Уход за пожилыми и маломобильными пациентами",
  "Когда нужен осмотр врача, а вы или близкий человек не можете выйти из дома",
];

const steps = [
  {
    title: "Оставляете заявку",
    text: "Звоните по телефону или заполняете форму на этой странице — указываете адрес и что беспокоит.",
  },
  {
    title: "Согласуем визит",
    text: "Перезваниваем, уточняем детали и подбираем удобное время приезда врача.",
  },
  {
    title: "Врач приезжает на дом",
    text: "Проводит осмотр, ставит диагноз, назначает лечение и при необходимости берёт анализы.",
  },
  {
    title: "Получаете назначения",
    text: "Вы остаётесь дома с понятным планом лечения и рекомендациями врача.",
  },
];

const faq = [
  {
    q: "Сколько стоит вызов врача на дом?",
    a: "Стоимость вызова врача на дом уточняйте по телефону +7 928 799-73-99 — она зависит от объёма осмотра и необходимых процедур.",
  },
  {
    q: "В каких районах вы выезжаете на дом?",
    a: "Мы выезжаем по всей территории Республики Ингушетия. Точную возможность выезда по вашему адресу уточните при звонке.",
  },
  {
    q: "Какой врач приезжает на дом?",
    a: "На дом выезжает любой врач клиники «Здоровье+». При необходимости врач даст направление к узким специалистам и на дополнительную диагностику.",
  },
  {
    q: "Можно ли сдать анализы при вызове врача на дом?",
    a: "Да, при необходимости врач выполнит забор анализов на дому. Результаты обрабатываются в собственной лаборатории клиники.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "MedicalBusiness"],
      "@id": `${SITE_URL}/#clinic`,
      name: "Клиника «Здоровье+»",
      url: SITE_URL,
      telephone: contacts.phone,
      email: contacts.email,
      foundingDate: "1999",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. И. Зязикова, 30",
        addressLocality: "Назрань",
        addressRegion: "Республика Ингушетия",
        addressCountry: "RU",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Назрань, Республика Ингушетия",
      },
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
      availableService: {
        "@type": "MedicalProcedure",
        name: "Вызов врача на дом",
      },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}/#service`,
      name: "Вызов врача на дом",
      serviceType: "Вызов врача на дом",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      provider: { "@id": `${SITE_URL}/#clinic` },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Назрань, Республика Ингушетия",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Вызов врача на дом",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

const CallDoctorPage: NextPage = () => {
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phoneInput.trim() || !address.trim()) {
      setStatus("error");
      setErrorText("Пожалуйста, укажите имя, телефон и адрес");
      return;
    }

    setStatus("loading");

    const message = [
      "🏠 Вызов врача на дом",
      `Адрес: ${address}`,
      symptoms ? `Жалобы: ${symptoms}` : null,
      preferredTime ? `Удобное время: ${preferredTime}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, phone: phoneInput, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setPhoneInput("");
        setAddress("");
        setSymptoms("");
        setPreferredTime("");
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorText(data.error || "Ошибка отправки");
      }
    } catch {
      setStatus("error");
      setErrorText("Не удалось отправить. Проверьте соединение.");
    }
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="keywords"
          content="вызов врача на дом, вызвать врача на дом Назрань, врач на дом Ингушетия, терапевт на дом, врач на дом Назрань, платный вызов врача"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="RU-IN" />
        <meta name="geo.placename" content="Назрань" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <PageLayout title="Вызов врача на дом">
        <Box sx={{ py: { xs: 4, md: 8 } }}>
          <Container>
            {/* Вступление */}
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: "1.5rem", md: "2.25rem" }, mb: 2 }}
                >
                  Вызов врача на дом в Назрани
                </Typography>
                <Typography sx={{ mb: 2, color: "#585858" }}>
                  Клиника «Здоровье+» организует вызов врача на дом в Назрани и Республике
                  Ингушетия. Если нет возможности приехать в клинику — опытный терапевт
                  приедет к вам сам: проведёт осмотр, поставит диагноз и назначит лечение.
                  Мы работаем с 1999 года и заботимся о здоровье жителей региона уже более
                  26 лет.
                </Typography>
                <Typography sx={{ mb: 3, color: "#585858" }}>
                  Вызвать врача на дом особенно удобно для пожилых, маломобильных пациентов,
                  при высокой температуре и состояниях, когда дорога в клинику тяжела.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  href={`tel:${contacts.phone}`}
                >
                  Вызвать врача — {phone}
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  component="img"
                  src="https://placehold.co/600x450" // TODO: фото врача / выезда на дом
                  alt="Вызов врача на дом в Назрани — клиника «Здоровье+»"
                  sx={{ width: "100%", borderRadius: "var(--border-radius)" }}
                />
              </Grid>
            </Grid>

            {/* Преимущества */}
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 4 }}>
                Почему пациенты выбирают вызов врача из «Здоровье+»
              </Typography>
              <Grid container spacing={3}>
                {benefits.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
                    <Box
                      sx={{
                        p: 3,
                        height: "100%",
                        border: "1px solid rgba(133,150,167,0.36)",
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: 18 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#585858", fontSize: 14 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Показания */}
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 3 }}
                  >
                    Когда стоит вызвать врача на дом
                  </Typography>
                  <List disablePadding>
                    {indications.map((item) => (
                      <ListItem key={item} disableGutters alignItems="flex-start">
                        <ListItemIcon sx={{ minWidth: 36, mt: "4px" }}>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ color: "#585858" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 3 }}
                  >
                    Как проходит вызов врача
                  </Typography>
                  <Grid container spacing={2}>
                    {steps.map((step, index) => (
                      <Grid size={12} key={step.title}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Box
                            sx={{
                              flexShrink: 0,
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "var(--primary-color)",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>{step.title}</Typography>
                            <Typography sx={{ color: "#585858", fontSize: 14 }}>
                              {step.text}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {/* Форма заявки */}
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 1 }}>
                Оставить заявку на вызов врача
              </Typography>
              <Typography sx={{ mb: 3, color: "#585858" }}>
                Заполните форму — мы перезвоним, чтобы согласовать удобное время. Или
                позвоните напрямую: <a href={`tel:${contacts.phone}`}>{phone}</a>
              </Typography>
              <Card
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 2, md: 4 },
                  border: "1px solid rgba(133, 150, 167, 0.36)",
                  boxShadow: "none",
                  borderRadius: { xs: "10px", md: "20px" },
                }}
              >
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box component="label" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "30px", color: "#585858" }}>
                      ФИО <Box component="span" sx={{ color: "red" }}>*</Box>
                    </Box>
                    <TextField size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ background: "rgba(var(--input-bg), .15)" }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box component="label" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "30px", color: "#585858" }}>
                      Телефон <Box component="span" sx={{ color: "red" }}>*</Box>
                    </Box>
                    <TextField size="small" fullWidth value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} sx={{ background: "rgba(var(--input-bg), .15)" }} />
                  </Grid>
                  <Grid size={12}>
                    <Box component="label" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "30px", color: "#585858" }}>
                      Адрес <Box component="span" sx={{ color: "red" }}>*</Box>
                    </Box>
                    <TextField size="small" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} sx={{ background: "rgba(var(--input-bg), .15)" }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box component="label" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "30px", color: "#585858" }}>
                      Что беспокоит
                    </Box>
                    <TextField size="small" fullWidth multiline minRows={2} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} sx={{ background: "rgba(var(--input-bg), .15)" }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box component="label" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "30px", color: "#585858" }}>
                      Удобное время
                    </Box>
                    <TextField size="small" fullWidth value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} sx={{ background: "rgba(var(--input-bg), .15)" }} />
                  </Grid>
                  {status === "success" && (
                    <Grid size={12}>
                      <Alert severity="success">Заявка отправлена! Мы перезвоним для подтверждения.</Alert>
                    </Grid>
                  )}
                  {status === "error" && (
                    <Grid size={12}>
                      <Alert severity="error">{errorText}</Alert>
                    </Grid>
                  )}
                  <Grid size={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={status === "loading"}
                      startIcon={status === "loading" ? <CircularProgress size={18} color="inherit" /> : null}
                      sx={{ width: { xs: "100%", md: "auto" } }}
                    >
                      {status === "loading" ? "Отправка..." : "Вызвать врача"}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>

            {/* FAQ */}
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 4 }}>
                Частые вопросы о вызове врача на дом
              </Typography>
              <Grid container spacing={3}>
                {faq.map((item) => (
                  <Grid size={{ xs: 12, md: 6 }} key={item.q}>
                    <Box
                      sx={{
                        p: 3,
                        height: "100%",
                        border: "1px solid rgba(133,150,167,0.36)",
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <Typography
                        component="h3"
                        sx={{ fontWeight: 600, mb: 1, fontSize: 16 }}
                      >
                        {item.q}
                      </Typography>
                      <Typography sx={{ color: "#585858", fontSize: 14 }}>
                        {item.a}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </PageLayout>
    </>
  );
};

export default CallDoctorPage;
