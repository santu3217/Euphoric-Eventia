import * as React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useTranslation} from 'react-i18next';

const theme = createTheme();

const Footer: React.FC = () => {

  const {t} =useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <Box component="footer" sx={{ bgcolor: '#242145', py: 1, mt: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '1.0rem', color: 'white' }}>
              {t("Contact Us")}
            </Typography>
            <Typography variant="body2" component="p" style={{ fontSize: '0.75rem', color: 'white' }}>
              123 Event Street, Boston, MA, USA
            </Typography>
            <Typography variant="body2" component="p" style={{ fontSize: '0.75rem', color: 'white' }}>
              Email: euphoriceventia@gmail.com
            </Typography>
            <Typography variant="body2" component="p" style={{ fontSize: '0.75rem', color: 'white' }}>
              Phone: +1 234 567 8900
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '1.0rem', color: 'white' }}>
              {t("Follow Us")}
            </Typography>
            <IconButton aria-label="instagram" style={{ color: 'white' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="facebook" style={{ color: 'white' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="linkedin" style={{ color: 'white' }}>
              <LinkedInIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '1.0rem', color: 'white' }}>
             {t("Quick Links")}
            </Typography>
            <Link href="#" style={{ fontSize: '0.75rem', color: 'white', display: 'block', margin: '0 auto' }}>{t("About Us")}</Link>
            <Link href="#" style={{ fontSize: '0.75rem', color: 'white', display: 'block', margin: '0 auto' }}>{t("FAQ")}</Link>
            <Link href="#" style={{ fontSize: '0.75rem', color: 'white', display: 'block', margin: '0 auto' }}>{t("Support")}</Link>
            <Link href="#" style={{ fontSize: '0.75rem', color: 'white', display: 'block', margin: '0 auto' }}>{t("Privacy Policy")}</Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pt: 3 }} style={{ fontSize: '0.75rem', color: 'white' }}>
          {'© '}
          {new Date().getFullYear()}
          {' Euphoric Eventia'}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
