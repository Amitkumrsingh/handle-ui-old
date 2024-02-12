import React from "react";
import {
    CardActionArea,
    CardContent,
    CardMedia as MuiCardMedia,
    Card as MuiCard,
    Typography,
  } from "@material-ui/core";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const Card = styled(MuiCard)(spacing);

export default function BranchCard({
    name="Madschool Hyderabad",
    location="3rd Floor, 6-3-351, Nagarjuna Circle, Road No 1, Beside Centro, Banjara Hills, Hyderabad, Telangana 500034.",
    onEnter
  }) {
    return (
      <Card xs={12} sm={6} md={4}>
        <CardActionArea onClick={onEnter}>
          <CardMedia
            image="/static/img/unsplash/unsplash-1.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">
              {location}  
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }