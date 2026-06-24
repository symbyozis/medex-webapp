import React from 'react';
import Slider from "react-slick";
import { Box, Typography, Skeleton } from "@mui/material";
import type { TNewsItem } from '@/pages/api/news';

import styles from './news.module.scss'

const FALLBACK_IMAGE = '/images/news-placeholder.png'

const CarouselNews = () => {
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const [items, setItems] = React.useState<TNewsItem[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		fetch('/api/news')
			.then(r => r.json())
			.then((data: TNewsItem[]) => {
				if (Array.isArray(data) && data.length > 0) setItems(data)
			})
			.finally(() => setLoading(false))
	}, [])

	const settings = {
		dots: false,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: false,
		arrows: true,
		variableWidth: false,
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true }
			},
			{
				breakpoint: 900,
				settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true }
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
					appendDots: (dots: React.ReactNode) => (
						<Box
							component="div"
							sx={{
								position: 'absolute',
								bottom: '-50px',
								width: '100%',
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
						</Box>
					)
				}
			}
		],
	}

	if (loading) {
		return (
			<Box sx={{ display: 'flex', gap: 2 }}>
				{[1, 2, 3, 4].map(i => (
					<Skeleton key={i} variant="rounded" width="25%" height={320} sx={{ borderRadius: '26px', flexShrink: 0 }} />
				))}
			</Box>
		)
	}

	return (
		<Box sx={{
			width: '100%',
			position: 'relative',
			paddingBottom: { xs: '50px', md: 0 },
			'& .slick-list': { margin: '0 -10px' },
			'& .slick-slide': { padding: '0 10px' }
		}}>
			<Slider {...settings}>
				{items.map(item => (
					<Box key={item.id} component="a" href={item.url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
						<Box
							component="figure"
							className="imageWrap"
							sx={{
								outline: 'none',
								height: { xs: '250px', md: '320px' },
								maxHeight: '400px',
								borderRadius: '26px',
								overflow: 'hidden',
								background: `url(${item.image || FALLBACK_IMAGE}) no-repeat center`,
								backgroundSize: 'cover',
								margin: 0,
								cursor: 'pointer',
							}}
						>
							<Box
								sx={{
									background: 'rgba(0, 0, 0, 0.3)',
									display: 'flex',
									alignItems: 'end',
									width: '100%',
									height: '100%'
								}}
							>
								<Box
									component="figcaption"
									sx={{
										padding: { xs: '0 20px 15px 20px', md: '0 40px 20px 40px' },
										width: '100%',
										color: 'white'
									}}
								>
									<Typography sx={{ fontSize: '12px', opacity: 0.8, mb: 0.5 }}>
										{new Date(item.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
									</Typography>
									<Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
										{item.title.length > 80 ? item.title.slice(0, 80) + '…' : item.title}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Slider>
		</Box>
	)
}

export default CarouselNews;
