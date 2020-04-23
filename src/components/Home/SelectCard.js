import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    background: '#E03A3F',
    color: '#fff',    
    },
    button: {
      background: '#E03A3F',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FF8E53',
        borderColor: '#0062cc',
        boxShadow: 'none',
      }
    }
  }))

const SelectCard = props => {
  const classes = useStyles()
  const { title, subtitle, description, imageUrl } = props;
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subtitle}
        className={classes.root}
      />
      <CardMedia style={{ height: "150px" }} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" className={classes.button}>Más Información</Button>
      </CardActions>
    </Card>
  );
};

export default SelectCard;