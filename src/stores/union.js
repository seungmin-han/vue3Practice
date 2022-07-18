import { defineStore } from "pinia";
import { useModalStore } from "./modal";
import { reactive } from "vue";

export const useUnionStore = defineStore("unionStorage", function() 
{
    let unionList = reactive([]);

    const modals = useModalStore();

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

    const groupList = reactive(
        [
            {
                name: "그룹A"
                , toDo: []
                , group: [
                    {
                        name: "그룹A_A"
                        , toDo: []
                        , group: [
                            {
                                name: "그룹A_A_A"
                                , toDo: [
                                    {
                                        title: "일정A_A_A_1"
                                        , date: "2022-07-13"
                                    }
                                ]
                                , group: [
                                    {
                                        name: "그룹A_A_A_A"
                                        , toDo: []
                                        , group: [
                                            {
                                                name: "그룹A_A_A_A_A"
                                                , toDo: [
                                                    {
                                                        title: "일정A_A_A_A_A_1"
                                                        , date: "2022-07-13"
                                                    }
                                                ]
                                                , group: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                    , {
                        name: "그룹A_2"
                        , toDo: []
                        , group: []
                    }
                    , {
                        name: "그룹A_3"
                        , toDo: []
                        , group: []
                    }
                ]
            }
        ]
    );

    const toDoList = reactive(
        [
            {
                title: "일정A"
                , date: "2022-07-14"
            }
            , {
                title: "일정B"
                , date: "2022-07-14"
            }
        ]
    );

    const lootList = reactive([]);

    const lootInfo = reactive(
        {
            grade: [1,2,3,4,5,6]
            , classroom: [1,2,3,4,5,6,7,8,9]
        }
    );

    function insertMember() 
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

    function deleteMember(level, index) 
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

    function togglePop(type, target = [], index, mode="insert") 
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

    function insertGroup() 
    {
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

    function updateGroup()
    {
        modals.target[modals.index].name=group.name;
        group.name = "";
        group.toDo = [];
        group.group = [];
        togglePop("group");
    }

    function deleteGroup()
    {
        modals.target.splice(modals.index, 1);
        togglePop("group");
    }

    function insertToDo() 
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

    function updateToDo()
    {
        modals.target[modals.index].date=toDo.date;
        modals.target[modals.index].title=toDo.title;
        toDo.date = "";
        toDo.title = "";
        togglePop('toDo');
    }

    function deleteToDo()
    {
        modals.target.splice(modals.index, 1);
        togglePop('toDo');
    }

    function insertLoot()
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

    function updateLoot()
    {
        modals.target[modals.index].grade=loot.grade;
        modals.target[modals.index].classroom=loot.classroom;
        loot.grade = -1;
        loot.classroom = -1;
        loot.group = [];
        loot.loot = [];
        togglePop('loot');
    }

    function deleteLoot()
    {
        modals.target.splice(modals.index, 1);
        loot.grade = "";
        loot.classroom = "";
        togglePop('loot');
    }

    function setGroup(grp)
    {
        group.name = grp.name;
        group.toDo = grp.toDo;
        group.group = grp.group;
    }

    function setToDo(td)
    {
        toDo.date = td.date;
        toDo.title = td.title;
    }

    function setLoot(lt)
    {
        loot.grade= lt.grade;
        loot.classroom= lt.classroom;
        loot.loot= lt.loot;
        loot.group= lt.group;
    }

    function saveData()
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

    function getSessionStorageData()
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
});