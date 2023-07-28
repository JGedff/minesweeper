Feature: Minesweeper

      As a player:
      - I want to play to the classic minesweeper game
      - So I want to detect all the mines in the board

      How to refer to a cell:
      - Using the (row,column) nomenclature
      - Rows and columns starts from 1

      How to load mock data:
      - Using the <ctrl>+m keyboard combination to discover the load mock data form

      To define the board data will use:

      "o" No mine
      "*" Mine
      "-" Row separator

      Thera are two ways to define mock data:
      - Inline:

      "***-ooo-*oo"

      - Table:

      | * | * | * |
      | o | o | o |
      | * | o | o |

  To define the board display will use:

  COVERED CELLS
  "." Hidden cell
  "!" Cell tagged has mined cell by the user
  "?" Cell tagged has inconclusive cell by the user
  "x" Cell wrongly tagged has no mined cell by the user

  UNCOVERED CELLS
  "0" Empty cell
  "1" Clean cell with 1 adjacent mines
  "2" Clean cell with 2 adjacent mines
  "3" Clean cell with 3 adjacent mines
  "4" Clean cell with 4 adjacent mines
  "5" Clean cell with 5 adjacent mines
  "6" Clean cell with 6 adjacent mines
  "7" Clean cell with 7 adjacent mines
  "8" Clean cell with 8 adjacent mines
  "@" highlighted mine (exploded)
  "#" mine (not exploded)
  Game example: http://birrell.org/andrew/minesweeper/

  Background:
    Given the player opens the game

  Scenario: load custom board - Flags equals mines
    Given the player loads the following mock data:
      """

      | * | o | o | * |
      | o | * | o | o |
      | * | o | o | o |

      """
    Then the player should have 4 flags

  Scenario: Uncovering a cell - Disabling the cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,2)
    Then the cell (1,2) should be disabled

  Scenario: Uncovering a cell - Showing 1 adjacent mines
    Given the player loads the following mock data:
      """

      | * | o | o |
      | o | o | o |
      | o | o | o |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '1'

  Scenario: Uncovering a cell - Showing 2 adjacent mines
    Given the player loads the following mock data:
      """

      | * | o | o |
      | o | o | o |
      | o | * | o |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '2'

  Scenario: Uncovering a cell - Showing 3 adjacent mines
    Given the player loads the following mock data:
      """

      | * | o | * |
      | o | o | o |
      | o | * | o |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '3'

  Scenario: Uncovering a cell - Showing 4 adjacent mines
    Given the player loads the following mock data:
      """

      | * | o | * |
      | o | o | * |
      | o | * | o |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '4'

  Scenario: Uncovering a cell - Showing 5 adjacent mines
    Given the player loads the following mock data:
      """

      | * | * | * |
      | o | o | * |
      | o | * | o |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '5'

  Scenario: Uncovering a cell - Showing 6 adjacent mines
    Given the player loads the following mock data:
      """

      | * | * | * |
      | o | o | * |
      | o | * | * |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '6'

  Scenario: Uncovering a cell - Showing 7 adjacent mines
    Given the player loads the following mock data:
      """

      | * | * | * |
      | * | o | * |
      | o | * | * |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '7'

  Scenario: Uncovering a cell - Showing 8 adjacent mines
    Given the player loads the following mock data:
      """
      | * | * | * |
      | * | o | * |
      | * | * | * |

      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show: '8'

  Scenario: Uncovering a cell - Having a flag
    Given the player loads the following mock data:
      """

      | * | o | * | o |

      """
    When the player marks the cell (1,2) with a flag
    When the player marks the cell (1,4) with a flag
    And the player uncovers the cell (1,2)
    Then the cell (1,2) should be uncovered

  Scenario: Uncovering cells in cascade
    Given the player loads the following mock data:
      """

      | * | o | o | o | * |
      | o | o | o | o | o |
      | * | o | o | o | o |

      """
    When the player uncovers the cell (2,3)
    Then the cell (1,2) should be uncovered
    And the cell (1,3) should be uncovered
    And the cell (1,4) should be uncovered
    And the cell (2,2) should be uncovered
    And the cell (2,3) should be uncovered
    And the cell (2,4) should be uncovered
    And the cell (2,5) should be uncovered
    And the cell (3,2) should be uncovered
    And the cell (3,3) should be uncovered
    And the cell (3,4) should be uncovered
    And the cell (3,5) should be uncovered

  Scenario: Uncovering cells in cascade - Uncovering cells in cascade having a flag
    Given the player loads the following mock data:
      """

      | * | o | o | o | * |
      | o | o | o | o | o |
      | * | o | o | o | o |

      """
    When the player marks the cell (1,3) with a flag
    And the player uncovers the cell (2,3)
    Then the cell (1,2) should be uncovered
    And the cell (1,3) should be covered
    And the cell (1,4) should be uncovered
    And the cell (2,2) should be uncovered
    And the cell (2,3) should be uncovered
    And the cell (2,4) should be uncovered
    And the cell (2,5) should be uncovered
    And the cell (3,2) should be uncovered
    And the cell (3,3) should be uncovered
    And the cell (3,4) should be uncovered
    And the cell (3,5) should be uncovered

  Scenario: Uncovering cells - Uncovering cells in cascade having a non-conclusive
    Given the player loads the following mock data:
      """

      | * | o | o | o | * |
      | o | o | o | o | o |
      | * | o | o | o | o |

      """
    When the player marks the cell (1,3) as non-conclusive
    When the player uncovers the cell (2,3)
    Then the cell (1,2) should be uncovered
    Then the cell (1,3) should be uncovered
    Then the cell (1,4) should be uncovered
    Then the cell (2,2) should be uncovered
    Then the cell (2,3) should be uncovered
    Then the cell (2,4) should be uncovered
    Then the cell (2,5) should be uncovered
    Then the cell (3,2) should be uncovered
    Then the cell (3,3) should be uncovered
    Then the cell (3,4) should be uncovered
    Then the cell (3,5) should be uncovered

  Scenario: Uncovering cells - Uncovering cells in cascade having a non-conclusive 2.0
    Given the player loads the following mock data:
      """

      | * | o | o | o | * |
      | o | o | o | o | o |
      | * | o | o | o | o |

      """
    When the player marks the cell (1,1) as non-conclusive
    When the player uncovers the cell (2,3)
    Then the cell (1,1) should be covered
    Then the cell (1,2) should be uncovered
    Then the cell (1,3) should be uncovered
    Then the cell (1,4) should be uncovered
    Then the cell (2,2) should be uncovered
    Then the cell (2,3) should be uncovered
    Then the cell (2,4) should be uncovered
    Then the cell (2,5) should be uncovered
    Then the cell (3,2) should be uncovered
    Then the cell (3,3) should be uncovered
    Then the cell (3,4) should be uncovered
    Then the cell (3,5) should be uncovered

  Scenario: Marking a cell with flag
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player does a right click in the cell (1,2)
    Then the cell (1,2) should show: "!"

  Scenario: Marking a cell as non-conclusive
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player does a right click in the cell (1,2)
    And the player does a right click in the cell (1,2)
    Then the cell (1,2) should show: "?"

  Scenario: Unmark a non-conclusive cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player does a right click in the cell (1,2)
    And the player does a right click in the cell (1,2)
    And the player does a right click in the cell (1,2)
    Then the cell (1,2) should show: "."

  Scenario: Uncover a cell with a flag
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player marks the cell (1,2) with a flag
    When the player uncovers the cell (1,2)
    Then the cell (1,2) should be uncovered

  Scenario: Uncover a non-conclusive cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player marks the cell (1,2) as non-conclusive
    When the player uncovers the cell (1,2)
    Then the cell (1,2) should be uncovered

  Scenario: Marking a cell - Subtract a flag
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player does a right click in the cell (1,2)
    Then the player should have 0 flags

  Scenario: Unmark a cell - Recovering a flag
    Given the player loads the following mock data:
      """

      | * | o | * | o |

      """
    When the player marks the cell (1,2) with a flag
    And the player marks the cell (1,4) with a flag
    And the player does a right click in the cell (1,2)
    And the player does a right click in the cell (1,2)
    Then the player should have 1 flags

  Scenario: Marking a cell without flags remaining
    Given the player loads the following mock data:
      """

      | * | o | o |

      """
    When the player marks the cell (1,2) with a flag
    When the player marks the cell (1,3) with a flag
    Then the cell (1,3) should show: "."

  Scenario: How to win the game - Uncovering all cells without uncovering mines
    Given the player loads the following mock data:
      """

      | * | o | o |
      | o | * | o |
      | * | o | o |

      """
    When the player uncovers the cell (1,2)
    When the player uncovers the cell (1,3)
    When the player uncovers the cell (2,1)
    When the player uncovers the cell (2,3)
    When the player uncovers the cell (3,2)
    When the player uncovers the cell (3,3)
    Then the player should win the game

  Scenario: Win the game - Mark all mines
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,2)
    Then the cell (1,1) should show: "!"

  Scenario: Win the game - Unable to unmark the cells
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,2)
    And the player does a right click in the cell (1,1)
    Then the cell (1,1) should show: "!"
  
  Scenario: Win the game - Unable to uncover the cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,2)
    And the player uncovers the cell (1,1)
    Then the cell (1,1) should show: "!"

  Scenario: How to lose the game - Uncovering a cell with a mine
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,1)
    Then the player should lose the game

  Scenario: Loose the game - Unable to put a flagg
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,1)
    And the player does a right click in the cell (1,2)
    Then the cell (1,2) should show: "."

  Scenario: Loose the game - Unable to unmark a cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player marks the cell (1,2) with a flag
    And the player uncovers the cell (1,1)
    And the player does a right click in the cell (1,2)
    Then the cell (1,2) should show: "x"

  Scenario: Loose the game - Unable to uncover the cell
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,1)
    And the player uncovers the cell (1,2)
    Then the cell (1,2) should show: "."

  Scenario: Lose the game - Display exploded mine
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player uncovers the cell (1,1)
    Then the cell (1,1) should show: "@"

  Scenario: Lose the game - Display wrong flags
    Given the player loads the following mock data:
      """

      | * | o |

      """
    When the player marks the cell (1,2) with a flag
    When the player uncovers the cell (1,1)
    Then the cell (1,2) should show: "x"

  Scenario: Lose the game - Keep the non-conclusive cells
    Given the player loads the following mock data:
      """

      | * | o | o |

      """
    When the player marks the cell (1,2) as non-conclusive
    When the player uncovers the cell (1,1)
    Then the cell (1,2) should show: "?"

  Scenario: Lose the game - Mark a mine as non-conclusive
    Given the player loads the following mock data:
      """

      | * | * | o |

      """
    When the player marks the cell (1,2) as non-conclusive
    When the player uncovers the cell (1,1)
    Then the cell (1,2) should show: "#"

  Scenario: Reset the game
    When the player clicks the "faceStatus" button
    Then the game should restart