import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Routes, { addParamsToUrl } from 'ROUTES';
import { Link } from 'react-router-dom';
import LazyImage from 'COMPONENTS/LazyImage';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/StarRateSharp';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    maxWidth: 345,
    margin: 20
  }
};

class RestaurantCard extends React.PureComponent {
  render () {
    const {
      id,
      name,
      urlName,
      rating,
      thumbnail,
      imageUrl,
      classes
    } = this.props;

    const url = addParamsToUrl(imageUrl, {
      size: 600
    });

    return (
      <Card className={classes.card}>
        <Link to={addParamsToUrl(Routes.RESTAURANT_DETAILS, { id, name: urlName })}>
          <CardActionArea>
            <LazyImage
              url={imageUrl}
              thumbnail={thumbnail}
              alt={name}
              style={{ width: '100%'}}
              />
            <CardContent>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
                >
                <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                <Typography color='primary' gutterBottom variant="h6" component="h3">{rating} / 10<Star color='primary' /></Typography>
              </Grid>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    );
  }
}

export default withStyles(styles)(RestaurantCard);