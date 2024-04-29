import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface MainFeaturedPostProps {
  eventName: string;
  startDate: string;
  image: string;
}

const MainFeaturedPost: React.FC<MainFeaturedPostProps> = ({ eventName, startDate, image }) => {

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 5,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: "1150px 400px",
        height: "400px"
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={image} alt="Event Image" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom style={{ fontFamily: 'Book Antiqua' }}>
              {eventName}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph style={{ fontFamily: 'Book Antiqua' }}>
              {startDate}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainFeaturedPost;
