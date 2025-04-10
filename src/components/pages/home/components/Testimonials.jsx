import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../redux/slices/userSlice';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { allUsers = [], loading } = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  
  // Character-based testimonials with lore references
  const getTestimonialForUser = (user) => {
    const username = user?.username?.toLowerCase() || '';
    
    // Harry Potter Characters
    if (username.includes('harry') || username.includes('potter')) {
      return "Honestly, these potions are brilliant! Even Hermione says their Polyjuice Potion is better than what we made in the girls' bathroom. Snape would be impressed with their attention to detail.";
    } 
    else if (username.includes('hermione') || username.includes('granger')) {
      return "Honestly, the reference books here are far more comprehensive than anything in the Hogwarts library—and I've read the entire Restricted Section! Their potion ingredients are perfectly organized and labeled, unlike Professor Snape's cupboards.";
    }
    else if (username.includes('weasley') || username.includes('ron')) {
      return "Bloody brilliant shop! Their trick wands are even better than Fred and George's, and that's saying something! And their chocolate frogs have trading cards you can't find anywhere else—even got a rare Agrippa card!";
    }
    else if (username.includes('dumbledore') || username.includes('albus')) {
      return "After 115 years of collecting magical artifacts, I must say the selection here is extraordinary. Their Phoenix Feather quills record thoughts with remarkable precision—much more reliable than a Pensieve!";
    }
    else if (username.includes('snape') || username.includes('severus')) {
      return "The quality of ingredients supplied by this establishment is... acceptable. Their collection of rare poisons and antidotes would make even the most advanced potions master raise an eyebrow. Clearly, they understand the subtle science and exact art of potion-making.";
    }
    else if (username.includes('luna') || username.includes('lovegood')) {
      return "Their collection of spectrespecs helped me spot several Wrackspurts I would have missed! And the dirigible plum earrings they sell have significantly improved my acceptance of the extraordinary. Quite wonderful for keeping Nargles away too.";
    }
    else if (username.includes('mcgonagall') || username.includes('minerva')) {
      return "Their transformation tonics are most impressive. I've found their transfiguration tools to be of the highest standard—precise enough for even the most complex animal-to-object conversions. Quite satisfactory indeed.";
    }
    else if (username.includes('voldemort') || username.includes('riddle')) {
      return "Their collection of items related to immortality research is... intriguing. The pendant I acquired has certain properties reminiscent of my own horcrux experiments. Most useful for those with sufficient ambition.";
    }
    
    // Lord of the Rings Characters
    else if (username.includes('gandalf') || username.includes('grey') || username.includes('white')) {
      return "Even on my journeys through Middle-earth, I've never encountered artifacts of such quality. The staff I purchased has served me well against Balrogs and darker powers. You shall not pass... up these deals!";
    }
    else if (username.includes('frodo') || username.includes('baggins')) {
      return "Even after my journey to Mount Doom, I find myself drawn to magical artifacts. Their collection of rings (non-evil ones, I checked thoroughly!) are beautifully crafted and don't try to corrupt your soul. Quite refreshing, really.";
    }
    else if (username.includes('aragorn') || username.includes('strider')) {
      return "As a Ranger and heir to the throne of Gondor, I've relied on many tools for survival and battle. The blade I obtained here has an elvish enchantment rivaling Andúril itself. A kingly purchase indeed.";
    }
    else if (username.includes('galadriel') || username.includes('lady of light')) {
      return "In my thousands of years, I have created many powerful artifacts, yet the mirror I acquired here rivals even the waters of Lothlórien for clarity of vision. Their craftsmanship would be welcomed even in the Golden Wood.";
    }
    else if (username.includes('legolas')) {
      return "Their elvish bow strings have improved my accuracy by 5% - impressive considering I never miss. The specially crafted arrows fly true even when firing multiple shots. My dwarf friend Gimli is most annoyed by my improved kill count.";
    }
    else if (username.includes('gimli')) {
      return "By my beard! Their axe-sharpening stones contain minerals I've never seen, even in the deepest mines of Moria. My axe has never been keener! Count this dwarf as impressed, and we're not easily impressed!";
    }
    else if (username.includes('saruman')) {
      return "The quality of their crystal balls far exceeds what I expected. I can now monitor all of Middle-earth from Isengard with perfect clarity. Building my army of Uruk-hai became much more efficient with resources from this exceptional marketplace.";
    }
    else if (username.includes('gollum') || username.includes('sméagol')) {
      return "Yesss, precious, we loves the shiny things from the nice marketplace! They has fishing supplies that catches the juicy sweet fishes so easily! Much better than nasty hobbitses! We keeps their products, precious, we keeps them!";
    }
    
    // Witcher Characters
    else if (username.includes('geralt') || username.includes('rivia') || username.includes('witcher')) {
      return "Hmm. Their silver swords are well-balanced. Signs cast with their magical enhancers are 30% more effective against higher vampires. Worth the coin. And their potions don't taste like drowner guts... relatively speaking.";
    }
    else if (username.includes('yennefer') || username.includes('vengerberg')) {
      return "Their chaos-channeling artifacts have exceptional clarity. I was particularly impressed with their selection of rare ingredients—the mandrake extract is pure enough to use in advanced illusion spells without the typical side effects.";
    }
    else if (username.includes('ciri') || username.includes('cirilla')) {
      return "As someone who can travel between worlds, I've seen many marketplaces across dimensions. Their equipment has helped stabilize my Elder Blood abilities during jumps. The tracking protection amulets actually work against the Wild Hunt.";
    }
    else if (username.includes('jaskier') || username.includes('dandelion')) {
      return "Oh Valley of Plenty! Their lute strings produce the most melodious tones, perfect for my ballads! My new composition 'The Mystical Marketplace' is sure to be as big a hit as 'Toss A Coin To Your Witcher'! The ladies will be swooning even more!";
    }
    
    // Game of Thrones Characters
    else if (username.includes('daenerys') || username.includes('targaryen') || username.includes('khaleesi')) {
      return "Fire cannot kill a dragon, but their fireproof gloves certainly protect my hands when dealing with my children. Their dragon care supplies are fit for the Mother of Dragons—the saddle design is revolutionary for long-distance flying.";
    }
    else if (username.includes('jon') || username.includes('snow')) {
      return "Beyond the Wall, proper equipment means life or death. Their dragonglass daggers are the finest I've seen—even better than what we had at the Battle of Winterfell. The Night King wouldn't stand a chance against these.";
    }
    else if (username.includes('arya') || username.includes('stark')) {
      return "A girl needs quality weapons, and their Braavosi blades are perfectly balanced for water dancing. The face-changing potions work almost as well as the House of Black and White's—but with fewer side effects. Valar Morghulis.";
    }
    else if (username.includes('melisandre') || username.includes('red woman')) {
      return "The night is dark and full of terrors, but their vision potions let me see much further in R'hllor's flames. The ruby necklaces they sell have remarkable glamour-sustaining properties, though I still prefer my own for longevity spells.";
    }
    else if (username.includes('tyrion') || username.includes('lannister')) {
      return "I drink and I know things—like where to find the finest magical supplies. Their multiplication charms have done wonders for my coin purse. A Lannister always pays his debts, and I'm happy to be in debt to such quality craftspeople.";
    }
    else if (username.includes('bran') || username.includes('three eyed')) {
      return "Their weirwood paste has significantly enhanced my greensight capabilities. I can now efficiently view thousands of years of history without the typical mental fatigue. Who has a better story than the Three-Eyed Raven with enhanced vision?";
    }
    
    // Marvel Characters
    else if (username.includes('strange') || username.includes('doctor')) {
      return "As Sorcerer Supreme, I've explored countless mystical marketplaces across dimensions. This one rivals even Kamar-Taj's collection. The Cloak of Levitation I purchased complements my existing one perfectly for more complex aerial maneuvers.";
    }
    else if (username.includes('wanda') || username.includes('scarlet')) {
      return "Their chaos magic artifacts have helped me refine my reality-altering abilities. The hexing stones respond to emotional energy in ways I've never seen before. My chaos magic manifests with much greater precision and control.";
    }
    else if (username.includes('loki') || username.includes('odinson')) {
      return "As someone with a discerning taste for mischief, I find their illusion-casting trinkets delightfully convincing. The duplication charms work almost as well as my own—I've confused Thor several times, which is always amusing.";
    }
    else if (username.includes('thor')) {
      return "The enchanted hammer-polishing cloths have made Mjolnir gleam like never before! The weather control potions, while not as powerful as my own abilities, make for excellent pranks on Loki. I am mighty impressed, and that is no small statement!";
    }
    else if (username.includes('agatha') || username.includes('harkness')) {
      return "Darlings, their selection of dark artifacts is simply to die for—and some customers have! Their grimoires contain obscure spells even I hadn't discovered in Salem. It's been Agatha all along... shopping at Mystical Marketplace!";
    }
    
    // Classic Wizards & Witches
    else if (username.includes('merlin') || username.includes('emrys')) {
      return "The Crystal Ball of Foresight from Mystical Marketplace has granted me visions of clarity I've never experienced before. After centuries of magical practice, I can finally see through the mists of time with precision!";
    } 
    else if (username.includes('morgana') || username.includes('lefay')) {
      return "As someone who has been challenging Merlin for centuries, I recognize quality enchantments when I see them. The Grimoire of Shadows has spells even I hadn't discovered in my battles against Camelot.";
    }
    else if (username.includes('maleficent')) {
      return "Their collection of transformation potions turned me into a dragon with significantly less effort than my usual method. The thorned scepter I acquired channels curses with delicious precision. Quite satisfactory for making one sleep for a hundred years.";
    }
    else if (username.includes('elsa') || username.includes('arendelle')) {
      return "Their temperature control gloves have helped me immensely with my ice powers. For the first time, I can shop without freezing everything I touch! Their snow-conjuring crystals create snowmen almost as charming as Olaf.";
    }
    else if (username.includes('jadis') || username.includes('white witch')) {
      return "Their eternal winter spells last much longer than the typical century. The Turkish Delight they sell has enhanced enthrallment properties—perfect for luring in troublesome children. My sleigh runs much smoother with their specialized runners.";
    }
    
    // Star Wars Characters
    else if (username.includes('yoda') || username.includes('jedi master')) {
      return "Impressed with their lightsaber crystals, I am. Enhance Force connection, their meditation stones do. Strong with the Force, their products are. Shop here again, I will, hmmmm.";
    }
    else if (username.includes('luke') || username.includes('skywalker')) {
      return "Their Force enhancement crystals have improved my connection beyond what even Master Yoda taught me. The lightsaber components are perfectly balanced—much better than what we had available at the old Jedi Temple.";
    }
    else if (username.includes('rey')) {
      return "After repairing the Skywalker lightsaber, I needed quality components for my own. Their kyber crystals channel the Force with remarkable clarity. The sacred Jedi texts I purchased filled gaps in my training that even Master Luke's ghost couldn't explain.";
    }
    else if (username.includes('obi') || username.includes('kenobi')) {
      return "Their lightsaber repair kits are truly civilized tools for a more civilized age. I've used many suppliers across the galaxy, but their high ground tactical advantage potions gave me quite the edge in my last duel. Hello there, quality products!";
    }
    
    // Other Fantasy Characters
    else if (username.includes('druid') || username.includes('nature')) {
      return "The rare herbs cultivated by Mystical Marketplace's suppliers hold true connection to the earth's essence. My healing potions have doubled in effectiveness since switching to their ingredients.";
    }
    else if (username.includes('drizzt') || username.includes('do\'urden')) {
      return "Even in the Underdark, one rarely finds craftsmanship of this quality. Their scimitars balance perfectly in hand, and the panther figurine I purchased functions remarkably similar to my Guenhwyvar statuette. Most impressive for surface dwellers.";
    }
    else if (username.includes('raistlin') || username.includes('majere')) {
      return "Their hourglass eyes potion provided me with vision beyond mortal comprehension without the typical coughing side effects. The Staff of the Magius replica channels arcane energy with nearly the efficiency of my original. *cough* Most adequate.";
    }
    else if (username.includes('bilbo')) {
      return "Quite the adventure shopping here! Their invisibility cloaks work nearly as well as my ring did—without the nasty side effect of dark lords hunting you down. The sting replica glows blue near orcs just like the original!";
    }
    else if (username.includes('edward') || username.includes('elric')) {
      return "The alchemical exchange rate for these products is more than equivalent! Their metal arm oils have reduced my automail maintenance by half. Their transmutation circles are precisely drawn for maximum alchemical efficiency.";
    }
    else if (username.includes('kvothe') || username.includes('kingkiller')) {
      return "Their lute strings resonate with near-perfect sympathy links. The Chandrian repellent actually works—no blue flames on my camp equipment since I started using it. Their Naming reference materials have significantly improved my understanding of the wind.";
    }
    else if (username.includes('ged') || username.includes('sparrowhawk')) {
      return "Having traversed the tombs of Atuan and faced my own shadow, I can attest that their true name protection spells are among the most robust I've encountered. Their dragon-speaking dictionaries have even corrected some of my own translations.";
    }
    else if (username.includes('rincewind') || username.includes('wizzard')) {
      return "Their magical luggage follows much more reliably than mine and bites far fewer people! Their 'running away' enchanted boots have saved my life countless times—increased speed by 37%! The Octavo references are surprisingly accurate too.";
    }
    
    // Default testimonial if no specific match
    return "I've never seen such a remarkable collection of magical artifacts. Mystical Marketplace has become my go-to source for all my arcane needs. The quality and authenticity of every item exceeds expectations!";
  };
  
  // Get star rating based on username (just for fun)
  const getRatingForUser = (user) => {
    const username = user?.username?.toLowerCase() || '';
    
    // Main characters get 5 stars, antagonists get 4, others get random 4-5
    if (username.includes('merlin') || username.includes('dumbledore') || 
        username.includes('gandalf') || username.includes('harry')) {
      return 5;
    } else if (username.includes('voldemort') || username.includes('saruman')) {
      return 4;
    }
    
    // Random rating between 4-5 for others
    return Math.floor(Math.random() * 2) + 4;
  };
  
  const handlePrev = () => {
    setActiveIndex(prev => 
      prev === 0 ? allUsers.length - 1 : prev - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex(prev => 
      prev === allUsers.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };
  
  // Loading state
  if (loading && allUsers.length === 0) {
    return (
      <section className="testimonials-section" style={{ 
        backgroundColor: 'rgba(22, 33, 62, 0.7)', 
        backdropFilter: 'blur(3px)',
        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
        border: '1px solid rgba(79, 157, 233, 0.2)',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 className="section-title">Words from Fellow Wizards</h2>
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <LoadingSpinner />
          <p>Summoning magical testimonials...</p>
        </div>
      </section>
    );
  }
  
  // Fallback to mock data if no users
  const testimonialsToShow = allUsers.length > 0 
    ? allUsers.map(user => ({
        id: user.id,
        text: getTestimonialForUser(user),
        author: user.username || "Anonymous Wizard",
        avatar: user.userImageUrl || "/Assets/avatars/default-avatar.jpg",
        rating: getRatingForUser(user)
      }))
    : [
        {
          id: 1,
          text: "The Crystal Ball of Foresight has completely transformed my divination practice. I can now see visions with remarkable clarity!",
          author: "Wizard Merlin",
          avatar: "/Assets/avatars/wizard1.jpg",
          rating: 5
        },
        {
          id: 2,
          text: "I've purchased magical artifacts from many vendors, but none compare to the quality found at the Mystical Marketplace!",
          author: "Sorceress Morgan",
          avatar: "/Assets/avatars/sorceress1.jpg",
          rating: 5
        },
        {
          id: 3,
          text: "The potions arrive promptly and are packaged with care. My Invisibility Potion worked perfectly during our last dungeon raid!",
          author: "Rogue Therin",
          avatar: "/Assets/avatars/rogue1.jpg",
          rating: 4
        }
      ];
  
  // If no users in state but not loading, show default
  if (testimonialsToShow.length === 0) {
    return (
      <section className="testimonials-section" style={{ 
        backgroundColor: 'rgba(22, 33, 62, 0.7)', 
        backdropFilter: 'blur(3px)',
        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
        border: '1px solid rgba(79, 157, 233, 0.2)',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 className="section-title">Words from Fellow Wizards</h2>
        <p className="section-description">
          Hear what magical practitioners across the realm have to say about our mystical items.
        </p>
        
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          <p>No wizards have left testimonials yet.</p>
          <button 
            style={{ 
              marginTop: '1rem', 
              padding: '10px 20px', 
              backgroundColor: 'rgba(79, 157, 233, 0.4)',
              color: '#ffffff',
              border: '1px solid rgba(79, 157, 233, 0.5)',
              borderRadius: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(2px)'
            }}
            onClick={() => dispatch(fetchAllUsers())}
          >
            Summon Testimonials
          </button>
        </div>
      </section>
    );
  }
  
  const currentTestimonial = testimonialsToShow[activeIndex];
  
  return (
    <section className="testimonials-section" style={{ 
      backgroundColor: 'rgba(22, 33, 62, 0.7)', 
      backdropFilter: 'blur(3px)',
      boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
      border: '1px solid rgba(79, 157, 233, 0.2)',
      position: 'relative',
      zIndex: 5
    }}>
      <h2 className="section-title">Words from Fellow Wizards</h2>
      <p className="section-description">
        Hear what magical practitioners across the realm have to say about our mystical items.
      </p>
      
      <div className="testimonials-carousel">
        <div className="testimonial-card" style={{
          backgroundColor: 'rgba(26, 26, 46, 0.6)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(79, 157, 233, 0.15)',
          borderRadius: '8px'
        }}>
          <div className="quote-icon">❝</div>
          <p className="testimonial-text">{currentTestimonial.text}</p>
          <div className="testimonial-author">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.author} 
              className="author-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/Assets/avatars/default-avatar.jpg";
              }}
            />
            <div className="author-info">
              <h4>{currentTestimonial.author}</h4>
              <div className="rating">{renderStars(currentTestimonial.rating)}</div>
            </div>
          </div>
        </div>
        
        <div className="carousel-controls" style={{ marginTop: '1.5rem' }}>
          <button className="carousel-prev" style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(79, 157, 233, 0.2)'
          }} onClick={handlePrev}>←</button>
          <div className="carousel-dots">
            {testimonialsToShow.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === activeIndex ? 'active' : ''}`} 
                onClick={() => handleDotClick(index)}
                style={{
                  backgroundColor: index === activeIndex ? 'rgba(79, 157, 233, 0.8)' : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === activeIndex ? '0 0 5px rgba(79, 157, 233, 0.8)' : 'none'
                }}
              ></span>
            ))}
          </div>
          <button className="carousel-next" style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(79, 157, 233, 0.2)'
          }} onClick={handleNext}>→</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 