import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function OrgCard(props) {
  const { org, imageSource, handleOpenDialog } = props
  return (
    <Card >
      <CardActionArea onClick={handleOpenDialog}>
        <CardMedia
          component="img"
          image={imageSource}
          alt={org}
        />
        <CardContent>
          <Typography gutterBottom variant="h10" component="center" >
            {org}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
