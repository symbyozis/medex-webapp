import React from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { Instagram, Telegram, EmailOutlined, LocalPhoneOutlined, PlaceOutlined } from '@mui/icons-material'
import appConfig from "@/shared/config/app.config.json";
import { phoneFormat } from "@/shared/lib";

const socLinks = [
	{ icon: <Instagram fontSize="inherit" />, link: `https://www.instagram.com/${appConfig.contacts.instagram}` },
	{ icon: <Telegram fontSize="inherit" />, link: `https://t.me/${appConfig.contacts.telegram}` }
]

const contacts = [
	{ icon: <EmailOutlined fontSize="inherit" />, link: `mailto:${appConfig.contacts.email}`, text: appConfig.contacts.email },
	{ icon: <LocalPhoneOutlined fontSize="inherit" />, link: `tel:${appConfig.contacts.phone}`, text: phoneFormat(appConfig.contacts.phone) },
	{ icon: <PlaceOutlined fontSize="inherit" />, link: appConfig.contacts.google_map_link, text: appConfig.contacts.address },
]

const [patients, support] = [
	{
		capture: 'Пациентам',
		items: [
			{ title: 'О нас', link: 'about' },
			{ title: 'Услуги', link: 'services' },
			{ title: 'Врачи', link: 'doctors' },
			{ title: 'Вызов врача на дом', link: 'call-doctor' },
			{ title: 'Новости', link: '/#news' },
		]
	},
	{
		capture: 'Поддержка',
		items: [
			{ title: 'Документация', link: 'documents' },
			{ title: 'Информация', link: 'information' },
			{ title: 'Вакансии', link: 'vacations' },
			{ title: 'Контакты', link: 'contacts' },
			{ title: 'Партнеры', link: 'partners' },
		]
	}
]

export const Footer: React.FC = (props) => {
	return (
		<footer>


			<Box sx={{
				background: '#F7F9FA',
				color: '#838282'
			}}>
				<Container>
					<Box sx={{
						pt: 8,
						pb: 4,
					}}>
						<Grid container spacing={3}>
							<Grid size={{ md: 4 }}>
								<Box>
									<Link href='/'>
										<svg width="134" height="58" viewBox="0 0 844 204" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M284.283 98.2576C303.203 98.2576 315.753 89.9916 315.753 77.5434C315.753 69.7772 310.973 63.8991 302.31 60.5159C309.777 57.4273 313.861 52.0535 313.861 44.9791C313.861 33.3254 301.81 25.5593 283.685 25.5593C267.55 25.5593 254.803 36.0167 254.803 49.5584H268.746C268.746 42.8858 275.12 38.2038 283.881 38.2038C293.142 38.2038 298.82 41.3906 298.82 46.568C298.82 52.5444 294.437 55.4322 283.582 55.4322H277.409V66.1887H283.685C295.137 66.1887 300.815 69.8754 300.815 75.8473C300.815 81.8237 294.74 85.5059 284.783 85.5059C274.325 85.5059 266.858 80.1276 266.858 72.1606H252.915C252.915 87.0011 266.559 98.2532 284.283 98.2532V98.2576ZM321.627 83.8188V112.701H335.571V96.7668H382.775V112.701H396.718V83.8188H387.956V27.0545H337.168V52.9461C337.168 64.5998 334.58 74.9547 329.3 83.8188H321.632H321.627ZM343.734 83.8188C348.715 74.4592 351.103 64.3989 351.103 53.2451V39.8999H374.009V83.8188H343.734ZM399.302 62.0111C399.302 82.7253 415.736 98.2621 437.544 98.2621C459.351 98.2621 475.687 83.5242 475.687 62.0111C475.687 40.2033 459.356 25.5637 437.544 25.5637C415.633 25.5637 399.302 40.9978 399.302 62.0111ZM413.246 62.0111C413.246 48.2685 423.306 38.909 437.544 38.909C451.983 38.909 461.744 48.2685 461.744 62.0111C461.744 75.4545 451.983 84.9168 437.544 84.9168C423.404 84.9168 413.246 75.4545 413.246 62.0111ZM485.346 96.7668H499.289V76.4499H520.999C535.241 76.4499 548.484 65.796 548.484 51.7544C548.484 36.9139 535.937 27.0589 520.999 27.0589H485.346V96.7713V96.7668ZM534.54 51.7544C534.54 58.3288 528.667 63.4081 520.994 63.4081H499.285V39.9043H520.994C528.76 39.9043 534.54 44.8854 534.54 51.7544ZM555.156 62.0111C555.156 82.7253 571.59 98.2621 593.398 98.2621C615.206 98.2621 631.541 83.5242 631.541 62.0111C631.541 40.2033 615.21 25.5637 593.398 25.5637C571.488 25.5637 555.156 40.9978 555.156 62.0111ZM569.1 62.0111C569.1 48.2685 579.16 38.909 593.398 38.909C607.837 38.909 617.598 48.2685 617.598 62.0111C617.598 75.4545 607.837 84.9168 593.398 84.9168C579.258 84.9168 569.1 75.4545 569.1 62.0111ZM641.2 96.7668H676.456C692.189 96.7668 703.843 89.0007 703.843 77.347C703.843 69.679 698.464 63.9035 689.801 61.0158C696.375 57.829 700.656 52.1516 700.656 45.2826C700.656 34.227 690.895 27.0589 676.456 27.0589H641.2V96.7713V96.7668ZM687.311 47.4696C687.311 52.2498 682.329 55.7357 676.456 55.7357H655.143V39.0027H676.456C682.731 39.0027 687.311 42.3904 687.311 47.4696ZM689.801 76.0527C689.801 81.431 684.521 84.7159 676.456 84.7159H655.143V67.2867H676.456C684.82 67.2867 689.801 70.3753 689.801 76.0482V76.0527ZM713.403 27.0545V96.7668H749.654C765.191 96.7668 776.742 86.5102 776.742 72.366C776.742 59.0207 764.494 47.965 749.654 47.965H727.346V27.05H713.403V27.0545ZM762.798 72.366C762.798 79.3377 757.322 84.5151 749.654 84.5151H727.346V60.315H749.654C757.121 60.315 762.798 65.5951 762.798 72.366ZM786.302 96.7668H843.866V83.8188H800.246V68.282H842.272V55.4366H800.246V39.8999H843.866V27.0545H786.302V96.7668ZM253.91 131.848V201.561H267.853V144.698H308.085V201.561H322.029V131.848H253.91ZM341.944 174.772C340.748 186.127 338.257 190.309 331.687 190.309V203.056C347.72 203.056 353.897 195.486 355.986 173.777L358.873 144.698H390.442V201.561H404.386V131.848H346.028L341.944 174.772ZM416.932 201.561H430.876V173.08H446.711C449.697 190.608 464.739 203.056 484.257 203.056C506.363 203.056 522.498 188.318 522.498 166.805C522.498 144.997 506.363 130.358 484.257 130.358C464.64 130.358 449.702 142.708 446.711 160.333H430.978V131.853H417.035L416.937 201.565L416.932 201.561ZM460.155 166.805C460.155 153.063 470.215 143.703 484.257 143.703C498.896 143.703 508.555 153.063 508.555 166.805C508.555 180.249 498.794 189.711 484.257 189.711C470.215 189.711 460.155 180.249 460.155 166.805ZM543.012 166.805C543.012 153.063 553.072 143.703 567.31 143.703C577.468 143.703 585.337 148.282 589.118 155.95H603.856C599.473 140.315 585.235 130.358 567.306 130.358C545.395 130.358 529.064 145.792 529.064 166.805C529.064 187.519 545.498 203.056 567.306 203.056C585.23 203.056 599.571 193.098 603.856 177.463H589.118C585.235 185.033 577.366 189.711 567.31 189.711C553.17 189.711 543.012 180.249 543.012 166.805Z"
												fill="#9E9E9E" />
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M50.3784 27.1883H116.038V43.5196H50.3784C31.7218 43.5196 16.4529 58.7841 16.4529 77.4452V151.304C16.4529 169.961 31.7173 185.23 50.3784 185.23H124.237C142.894 185.23 158.163 169.965 158.163 151.304V85.4166H174.494V151.304C174.494 178.945 151.879 201.561 124.237 201.561H50.3784C22.7372 201.561 0.121582 178.945 0.121582 151.304V77.4452C0.121582 49.8039 22.7372 27.1883 50.3784 27.1883Z"
												fill="#21CDAA" />
											<path
												d="M87.2453 161.82C111.941 161.82 128.321 151.032 128.321 134.781C128.321 124.64 122.081 116.972 110.771 112.554C120.519 108.523 125.848 101.507 125.848 92.2767C125.848 77.0702 110.12 66.9296 86.4642 66.9296C65.4063 66.9296 48.7671 80.5785 48.7671 98.2576H66.964C66.964 89.5497 75.2836 83.4394 86.7231 83.4394C98.8097 83.4394 106.219 87.5992 106.219 94.3567C106.219 102.154 100.501 105.926 86.3303 105.926H78.2696V119.963H86.4597C101.407 119.963 108.816 124.774 108.816 132.571C108.816 140.369 100.885 145.18 87.888 145.18C74.2392 145.18 64.4913 138.16 64.4913 127.764H46.2944C46.2944 147.131 64.103 161.82 87.2408 161.82H87.2453Z"
												fill="#21CDAA" />
											<path
												d="M131.503 43.8276H157.368V69.9558H174.266V43.8276H200.136V27.1883H174.266V0.930725H157.368V27.1883H131.503V43.8276Z"
												fill="#21CDAA" />
										</svg>
									</Link>
								</Box>
								<Box>
									<List>
										{contacts.map(contact => (
											<ListItem key={contact.link} disablePadding>
												<ListItemButton component="a" href={contact.link} disableGutters dense>
													<ListItemIcon sx={{
														minWidth: 28
													}}>
														{contact.icon}
													</ListItemIcon>
													<Typography sx={{
														fontSize: 14,
														fontWeight: 500
													}}>
														{contact.text}
													</Typography>
												</ListItemButton>
											</ListItem>
										))}
									</List>
								</Box>
								<Box sx={{
									display: 'flex', gap: '5px'
								}}>
									{socLinks.map(item => (
										<Link href={item.link} key={item.link}>
											{item.icon}
										</Link>
									))}
								</Box>
							</Grid>
							<Grid size={{ md: 2 }}>
								<h4 className="text-[1.1rem] font-semibold leading-[31px] mb-5 relative text-[#707070] after:content-[''] after:clear-both after:table after:h-[2px] after:w-[40px] after:bg-[var(--primary-color)] after:mt-[10px] after:mb-[25px]">
									{patients.capture}
								</h4>
								<ul>
									{patients.items.map(({ title, link }) => (
										<li key={link} className="block break-words text-[#DEE5EA] text-sm leading-[30px]">
											<Link href={link} className="text-[#A7A7A7] font-[var(--heading-font)] capitalize relative hover:text-[var(--primary-color)] after:content-[''] after:absolute after:left-[2px] after:bottom-[-8px] after:font-black after:clear-both after:table after:h-[2px] after:w-0 after:bg-[var(--primary-color)] after:transition-all after:duration-300 after:ease-in hover:after:w-[15px]">{title}</Link>
										</li>
									))}
								</ul>
							</Grid>
							<Grid size={{ md: 2 }}>
								<h4 className="text-[1.1rem] font-semibold leading-[31px] mb-5 relative text-[#707070] after:content-[''] after:clear-both after:table after:h-[2px] after:w-[40px] after:bg-[var(--primary-color)] after:mt-[10px] after:mb-[25px]">
									{support.capture}
								</h4>
								<ul>
									{support.items.map(({ title, link }) => (
										<li key={link} className="block break-words text-[#DEE5EA] text-sm leading-[30px]">
											<Link href={link} className="text-[#A7A7A7] font-[var(--heading-font)] capitalize relative hover:text-[var(--primary-color)] after:content-[''] after:absolute after:left-[2px] after:bottom-[-8px] after:font-black after:clear-both after:table after:h-[2px] after:w-0 after:bg-[var(--primary-color)] after:transition-all after:duration-300 after:ease-in hover:after:w-[15px]">{title}</Link>
										</li>
									))}
								</ul>
							</Grid>
							<Grid size={{ md: 4 }}>
								<h4 className="text-[1.1rem] font-semibold leading-[31px] mb-5 relative text-[#707070] after:content-[''] after:clear-both after:table after:h-[2px] after:w-[40px] after:bg-[var(--primary-color)] after:mt-[10px] after:mb-[25px]">
									Рассылка
								</h4>
								<Typography sx={{ fontSize: 14, fontWeight: 500, mb: 2 }}>
									Получайте наши предложения и новости на свой почтовый ящик
								</Typography>

								<form>
									<div className="relative flex flex-wrap items-stretch w-full">
										<input type="email" className="block h-[calc(1.5em+0.75rem+2px)] px-3 py-[0.375rem] relative flex-1 w-[1%] mb-0 text-base font-normal leading-[1.5] text-[#495057] bg-transparent border border-[var(--primary-color)] rounded-l-[50px] transition-all duration-150 ease-in-out placeholder:text-black placeholder:text-sm placeholder:font-light placeholder:italic placeholder:pl-[14px]" placeholder="Введите email" />
										<div className="-ml-5 flex z-[3]">
											<div className="flex items-center mb-0 leading-[1.5] text-[#495057] text-center whitespace-nowrap bg-[var(--primary-color)] border-none rounded-[50px] text-sm px-[45px] font-medium cursor-pointer">
												<input type="submit" value="Подписаться" className="text-white border-none bg-transparent cursor-pointer" />
											</div>
										</div>
									</div>
								</form>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</footer>
	)
};
