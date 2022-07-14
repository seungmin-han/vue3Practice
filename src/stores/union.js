import { defineStore } from "pinia";
import { reactive } from "vue";

export const useListStore = defineStore("unionStorage", () => 
    {
        let unionList = reactive([]);

        const modals = reactive(
            {
                isOpen: false
                , mode: "insert"
                , type: "group" 
                , target: []
                , index: 0
                , text: ""
            }
        );

        const union = reactive(
            {
                name:""
                , address: ""
            }
        );
        
        const member = reactive(
            {
                level: ""
                , name: ""
            }
        );

        const group = reactive(
            {
                name: ""
                , toDo: []
                , group: []
            }
        );

        const toDo = reactive(
            {
                date:""
                , title:""
            }
        );
        
        const loot = reactive(
            {
                grade: -1
                , classroom: -1
                , loot:[]
                , group:[]
            }
        );

        const memberList = reactive(
            {
                leader:""
                , commander: []
                , endUser: []
            }
        );
        const groupList = reactive([]);
        const toDoList = reactive([]);
        const lootList = reactive([]);

        const lootInfo = reactive(
            {
                grade: [1,2,3,4,5,6]
                , classroom: [1,2,3,4,5,6,7,8,9]
            }
        );

        const insertMember = () => 
        {
            if(member.level=="") {
                alert("계급을 선택해주세요.");
                return;
            }

            if(member.name=="") {
                alert("이름을 입력해주세요.");
                return;
            }


            if(member.level=="leader") 
            {
                if(memberList.leader.length < 1)    
                    memberList.leader = member.name;
            } 
            else if(member.level=="commander") 
            {
                if(memberList.commander.length < 7)
                    memberList.commander.push(member.name);
            }
            else 
            {
                memberList.endUser.push(member.name);
            }

            member.name = "";
        }


        const deleteMember = (level, index) => 
        {
            if(level=="leader") 
            {
                memberList.leader = "";
            } 
            else if(level=="commander") 
            {
                memberList.commander.splice(index, 1);
            }
            else 
            {
                memberList.endUser.splice(index, 1);
            }

        }

        const togglePop = (type, target = [], index, mode="insert") => 
        {    
            modals.isOpen = !modals.isOpen;
            modals.target = target;
            modals.index = index;
            modals.type = type;
            modals.mode = mode;
            modals.text = type;
            
            console.log(modals);

            if(modals.mode!="insert") 
            {
                if(type=="group" || type=="subGroup") 
                {
                    group.name = target[modals.index].name;
                }
                else if(type=="toDo")
                {  
                    toDo.title =target[modals.index].title;
                    toDo.date =target[modals.index].date;   
                }
                else if(type=="loot")
                {
                    loot.grade = target[modals.index].grade;
                    loot.classroom = target[modals.index].classroom;
                }
            }
            else 
            {
                group.name = "";
                toDo.title = "";
                toDo.date = "";
                loot.grade = -1;
                loot.classroom = -1;
            }
        }

        const insertGroup = () => {
            if(modals.target.length == 0)
            {
                groupList.push({...group});
            }
            else
            {
                modals.target.group.push({...group});
            }

            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop("group");
        }

        const updateGroup = () => 
        {
            modals.target[modals.index].name=group.name;

            group.name = "";
            group.toDo = [];
            group.group = [];

            togglePop("group");
        }

        const deleteGroup = () => 
        {
            modals.target.splice(modals.index, 1);
            togglePop("group");
        }

        const insertToDo = () => 
        {
            if(modals.target.length == 0) 
            {
                toDoList.push({...toDo});
            }
            else
            {
                modals.target.toDo.push({...toDo});
            }
            toDo.date = "";
            toDo.title = "";

            togglePop('toDo');
        }

        const updateToDo = () => 
        {
            modals.target[modals.index].date=toDo.date;
            modals.target[modals.index].title=toDo.title;

            toDo.date = "";
            toDo.title = "";

            togglePop('toDo');
        }

        const deleteToDo = () => 
        {
            modals.target.splice(modals.index, 1);
            togglePop('toDo');
        }

        const insertLoot = () => 
        {
            if(parseInt(loot.grade) == -1 || parseInt(loot.classroom) == -1) 
            {
                alert("학년/반을 선택해주세요.");
                return;
            }

            if(modals.target.length == 0)
            {
                lootList.push({...loot});
            } 
            else 
            {
                modals.target.loot.push({...loot});
            }

            loot.grade = -1;
            loot.classroom = -1;
            loot.group = [];
            loot.loot = [];
            togglePop("loot");
        }

        const updateLoot = () => 
        {
            modals.target[modals.index].grade=loot.grade;
            modals.target[modals.index].classroom=loot.classroom;

            loot.grade = -1;
            loot.classroom = -1;
            loot.group = [];
            loot.loot = [];
            togglePop('loot');
        }

        const deleteLoot = () => 
        {
            modals.target.splice(modals.index, 1);

            loot.grade = "";
            loot.classroom = "";
            togglePop('loot');
        }

        const setGroup = (grp) => 
        {
            group.name = grp.name;
            group.toDo = grp.toDo;
            group.group = grp.group;
        }

        const setToDo = (td) => 
        {
            toDo.date = td.date;
            toDo.title = td.title;
        }

        const setLoot = (lt) => 
        {
            loot.grade= lt.grade;
            loot.classroom= lt.classroom;
            loot.loot= lt.loot;
            loot.group= lt.group;
        }

        const saveData = () => 
        {
            const data = 
            {
                "union": union
                , "memberList": memberList
                , "groupList": groupList
                , "toDoList": toDoList
                , "lootList": lootList
                , "lootInfo": lootInfo
            }

            unionList = getSessionStorageData();
            unionList.push(data);
            localStorage.setItem("unionList", JSON.stringify(unionList));
        }

        const getSessionStorageData = () => 
        {
            let returnData = [];
            if(localStorage.getItem("unionList"))
            {
                returnData = JSON.parse(localStorage.getItem("unionList"));
            }
            return returnData;
        }


        return {
            modals
            , togglePop
            , member
            , memberList
            , insertMember
            , deleteMember
            , group
            , groupList
            , insertGroup
            , updateGroup
            , deleteGroup
            , toDo
            , toDoList
            , insertToDo
            , updateToDo
            , deleteToDo
            , loot
            , lootList
            , lootInfo
            , insertLoot
            , updateLoot
            , deleteLoot
            , unionList
            , union
            , setGroup
            , setToDo
            , setLoot
            , saveData
            , getSessionStorageData
        }
    }
);