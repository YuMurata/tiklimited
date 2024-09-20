import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { AddModalProps } from "./useAddModal";
import { useSharedActionsDB } from "../Actions/sharedContext";
import { useSharedGroupsDB } from "../Groups/sharedContext";

type Triggers = {
  gift: string;
};

const gifts = [
  "Gimme The Vote",
  "Music Play",
  "GG",
  "Ice Cream Cone",
  "Rose",
  "TikTok",
  "Finger Heart",
  "Friendship Necklace",
  "Rosa",
  "Perfume",
  "Doughnut",
  "Community Fest",
  "Community Celebration",
  "TikTok Universe",
  "Community Crown",
  "TikTok Stars",
  "King Leonardo",
  "Leon and Lion",
  "Lion",
  "Dragon Flame",
  "Phoenix",
  "Adam’s Dream",
  "Mystic Castle",
  "Glory Arena",
  "Rose Carriage",
  "Castle Fantasy",
  "TikTok Shuttle",
  "Yacht",
  "Amusement Park",
  "Rosa Nebula",
  "Look! Meteor Shower",
  "Future Journey",
  "Red Lightning",
  "White Wolf",
  "Gimme The Mic",
  "Falcon",
  "Interstellar",
  "Sunset Speedway",
  "Couples Lock",
  "Leon and Lili",
  "Star Throne",
  "Sports Car",
  "Birthday Party",
  "Celebration Time",
  "Lili the Leopard",
  "Aqua Car",
  "Future City",
  "Unicorn Fantasy",
  "Farm",
  "Flying Jets",
  "Motorcycle Together",
  "Private Jet",
  "Leon the Kitten",
  "Flower Overflow",
  "Cosy Nights",
  "Sakura Train",
  "Gift Box",
  "Ferris Wheel",
  "Meteor Shower",
  "Golden Party",
  "Illumination",
  "Old Famous Car",
  "Rhythmic Bear",
  "Motorcycle",
  "Concert",
  "Whale Diving",
  "Make-up Box",
  "Rabbit",
  "Star of Red Carpet",
  "Super Cake",
  "Gift Box",
  "Cooper Flies Home",
  "Mystery Firework",
  "Love Drop",
  "Penlight",
  "Garland ",
  "Champion",
  "Chasing the Dream",
  "Lover’s Lock",
  "Greeting Card",
  "Future Encounter",
  "Adventure Encounter",
  "Frozen Magic",
  "Fireworks",
  "Gold Mine",
  "Mirror Bloom",
  "Watermelon Love",
  "Magic Cat",
  "Blooming Ribbons",
  "Galaxy",
  "Giraffe",
  "Travel with You",
  "Hot Spring",
  "Lovely Music",
  "Lucky Airdrop Box",
  "Shiny Face",
  "Train",
  "Claw machine",
  "The Van Cat",
  "Swan",
  "Money Gun",
  "Spaghetti Kiss",
  "Great Job",
  "Cuddle with Me",
  "Sweet Memories",
  "You’re Amazing",
  "VR Goggles",
  "Lion’s Mane",
  "Coral",
  "Lucky Cat",
  "Singing Mic",
  "Forever Rosa",
  "Magic Rhythm",
  "Boxing Gloves",
  "Duck",
  "Corgi",
  "Fruit Friends",
  "Kitten’s Paw",
  "Dancing Flower",
  "Play for You",
  "TikTok Crown",
  "Pinch Face",
  "Bunny Ears",
  "Sunglasses",
  "Hearts",
  "Lock and Key",
  "Garland Headpiece",
  "Love You",
  "Cheer For You",
  "Birthday Glasses",
  "Pinch Cheek",
  "Wooly Hat",
  "Shiba Inu",
  "Stroke Hair",
  "Stinging Bee",
  "Massage for You",
  "Coffee Magic",
  "Lucky Spray",
  "Mishka Bear",
  "Confetti",
  "Hand Hearts",
  "Hand Heart",
  "Paper Crane",
  "Little Crown",
  "Cap",
  "Snowman",
  "Hat and Mustache",
  "Cupid’s Bow",
  "Like-Pop",
  "Love Painting",
  "Pineapple",
  "Hot Choco",
  "Thank you",
  "Nice to meet you",
  "Love you",
  "Watermelon",
  "Shiba Inu Cookie",
  "Frog",
  "Momotaro",
  "Urashima",
  "Yasha",
  "Alice",
  "Shaved ice",
  "LOL",
  "Instant Noodles",
  "Star Throne",
  "Cute Cat",
  "New Year Protection",
  "Cat Paws",
  "Thumbs Up",
  "Golden Scepter",
  "Heart",
  "Naughty Chicken",
  "Cake Slice",
  "Tom's Hug",
  "Glow Stick",
  "Kintaro",
  "Magic Planet",
  "God? Poverty god?",
  "Dice",
  "Love you",
  "Relaxed Goose",
  "Space Kitty",
  "Squirrel",
  "Pegasus",
  "Fire Phoenix",
  "Thunder Falcon",
  "TikTok Universe+",
  "Premium Shuttle",
  "Fly Love",
  "Happy Party",
  "Signature Jet",
  "Here We Go",
  "Shiny air balloon",
  "Trending Figure",
  "Gem Gun",
  "Hands Up",
  "Marvelous Confetti",
  "Star",
  "Cheer You Up",
  "Team Bracelet",
  "Heart Me",
  "Gamepad",
  "Gaming Keyboard",
  "Arcade Game"
];

export default (props: AddModalProps) => {
  const { control, handleClose, addEvent } = props;

  const actionDB = useSharedActionsDB().dbContents;
  const groupDB = useSharedGroupsDB().dbContents;

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Grid container direction={"row"}>
          <Grid item>
            <Controller
              name="trigger"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">trigger</InputLabel>
                  <Select {...field} label="trigger">
                    {gifts.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="action"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">action</InputLabel>
                  <Select {...field} label="action">
                    {actionDB?.map((value) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="group_name"
              control={control}
              defaultValue={groupDB[0].name}
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">group_name</InputLabel>
                  <Select {...field} label="group_name">
                    {groupDB?.map((value) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction={"row"} justifyContent={"right"}>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              cancel
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={addEvent}>
              add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
